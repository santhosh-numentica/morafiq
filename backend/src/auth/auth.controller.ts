import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Email/OTP Endpoints
  @Public()
  @Post('send-otp')
  async sendOTP(@Body('email') email: string) {
    return this.authService.sendOTP(email);
  }

  @Public()
  @Post('verify-otp')
  async verifyOTP(@Body('email') email: string, @Body('code') code: string) {
    return this.authService.verifyOTP(email, code);
  }

  // Google OAuth (Mobile App - ID Token)
  @Public()
  @Post('google')
  async googleLogin(@Body('idToken') idToken: string) {
    return this.authService.googleLogin(idToken);
  }

  // Passkey/WebAuthn Endpoints
  @Public()
  @Post('passkey/register/options')
  async generatePasskeyRegistrationOptions(@Body('email') email: string) {
    return this.authService.generatePasskeyRegistrationOptions(email);
  }

  @Public()
  @Post('passkey/register/verify')
  async verifyPasskeyRegistration(
    @Body('email') email: string,
    @Body('response') response: any,
  ) {
    return this.authService.verifyPasskeyRegistration(email, response);
  }

  @Public()
  @Post('passkey/authenticate/options')
  async generatePasskeyAuthenticationOptions(@Body('email') email: string) {
    return this.authService.generatePasskeyAuthenticationOptions(email);
  }

  @Public()
  @Post('passkey/authenticate/verify')
  async verifyPasskeyAuthentication(@Body('response') response: any) {
    return this.authService.verifyPasskeyAuthentication(response);
  }

  // Protected endpoint example
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
