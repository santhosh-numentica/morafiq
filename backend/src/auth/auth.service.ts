import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
  verifyRegistrationResponse,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Email/OTP Authentication
  async sendOTP(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing unused OTP for this email
    await this.prisma.oTP.deleteMany({
      where: { email, used: false },
    });

    // Create new OTP
    await this.prisma.oTP.create({
      data: { email, code: otp, expiresAt },
    });

    // Send email
    await this.sendEmail(email, otp);

    return { message: 'OTP sent successfully' };
  }

  async verifyOTP(email: string, code: string) {
    const otp = await this.prisma.oTP.findFirst({
      where: { email, code, used: false },
    });

    if (!otp || otp.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Mark OTP as used
    await this.prisma.oTP.update({
      where: { id: otp.id },
      data: { used: true },
    });

    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { email, emailVerified: true },
      });
    } else {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });
    }

    return this.generateToken(user.id);
  }

  // Google OAuth (Mobile App - ID Token verification)
  async googleLogin(idToken: string) {
    const client = new OAuth2Client(
      this.configService.get('GOOGLE_CLIENT_ID'),
    );

    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: this.configService.get('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Invalid Google token');
      }

      const { sub: googleId, email } = payload;

      let user = await this.prisma.user.findUnique({
        where: { googleId },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            googleId,
            googleEmail: email,
            email,
            emailVerified: true,
          },
        });
      } else {
        // Update email if it changed
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            googleEmail: email,
            email,
          },
        });
      }

      return this.generateToken(user.id);
    } catch (error) {
      throw new UnauthorizedException('Google token verification failed');
    }
  }

  // Passkey/WebAuthn
  async generatePasskeyRegistrationOptions(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const options = await generateRegistrationOptions({
      rpName: 'Morafiq',
      rpID: this.configService.get('RP_ID') || 'localhost',
      userID: user.id,
      userName: email,
      userDisplayName: email,
      excludeCredentials: user.passkeys.map(passkey => ({
        id: passkey.credentialId,
        transports: passkey.transports?.split(',') as any[],
      })),
    });

    return options;
  }

  async verifyPasskeyRegistration(email: string, response: any) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge: response.challenge,
      expectedOrigin: this.configService.get('RP_ORIGIN') || 'http://localhost:3000',
      expectedRPID: this.configService.get('RP_ID') || 'localhost',
    });

    if (!verification.verified) {
      throw new UnauthorizedException('Passkey verification failed');
    }

    await this.prisma.passkey.create({
      data: {
        credentialId: verification.registrationInfo.credentialID,
        publicKey: JSON.stringify(verification.registrationInfo.publicKey),
        counter: verification.registrationInfo.counter,
        transports: verification.registrationInfo.transports?.join(','),
        userId: user.id,
      },
    });

    return this.generateToken(user.id);
  }

  async generatePasskeyAuthenticationOptions(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { passkeys: true },
    });

    if (!user || user.passkeys.length === 0) {
      throw new BadRequestException('No passkeys found for user');
    }

    const options = await generateAuthenticationOptions({
      rpID: this.configService.get('RP_ID') || 'localhost',
      userVerification: 'preferred',
      allowCredentials: user.passkeys.map(passkey => ({
        id: passkey.credentialId,
        transports: passkey.transports?.split(',') as any[],
      })),
    });

    return options;
  }

  async verifyPasskeyAuthentication(response: any) {
    const passkey = await this.prisma.passkey.findUnique({
      where: { credentialId: response.id },
      include: { user: true },
    });

    if (!passkey) {
      throw new UnauthorizedException('Passkey not found');
    }

    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge: response.challenge,
      expectedOrigin: this.configService.get('RP_ORIGIN') || 'http://localhost:3000',
      expectedRPID: this.configService.get('RP_ID') || 'localhost',
      authenticator: {
        credentialID: passkey.credentialId,
        credentialPublicKey: new Uint8Array(Buffer.from(JSON.parse(passkey.publicKey))),
        counter: passkey.counter,
        transports: passkey.transports?.split(',') as any[],
      },
    });

    if (!verification.verified) {
      throw new UnauthorizedException('Passkey verification failed');
    }

    await this.prisma.passkey.update({
      where: { id: passkey.id },
      data: { counter: verification.authenticationInfo.newCounter },
    });

    return this.generateToken(passkey.user.id);
  }

  // JWT Token Generation
  private async generateToken(userId: string) {
    const token = this.jwtService.sign({ sub: userId });

    // Store session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await this.prisma.session.create({
      data: { userId, token, expiresAt },
    });

    return { access_token: token };
  }

  // Email Helper
  private async sendEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });

    await transporter.sendMail({
      from: this.configService.get('SMTP_FROM'),
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
    });
  }
}
