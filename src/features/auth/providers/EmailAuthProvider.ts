import { IAuthProvider, EmailAuthProviderConfig, AuthCredential } from '@features/auth/types';
import { AuthProviderType } from '@features/auth/types';

export class EmailAuthProvider implements IAuthProvider {
  public async signIn(config: EmailAuthProviderConfig): Promise<AuthCredential> {
    return {
      provider: 'email' as AuthProviderType,
      user: {
        email: config.email,
      },
    };
  }

  public async signOut(): Promise<void> {
    // No-op for email provider
  }

  public async isAvailable(): Promise<boolean> {
    return true;
  }
}

export default EmailAuthProvider;
