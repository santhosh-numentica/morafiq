import { IAuthProvider, PasskeyAuthProviderConfig, AuthCredential } from '@features/auth/types';
import { AuthProviderType } from '@features/auth/types';
import { config } from '@app/config/environment';
import { featureFlags } from '@app/config/featureFlags';

export class PasskeyAuthProvider implements IAuthProvider {
  public async signIn(config?: PasskeyAuthProviderConfig): Promise<AuthCredential> {
    if (!featureFlags.passkeyLogin) {
      throw new Error('Passkey login is not enabled');
    }

    if (!config?.challenge) {
      throw new Error('Passkey challenge is required');
    }

    // In a real implementation, this would call WebAuthn/FIDO2 APIs
    // For now, we'll return a placeholder credential
    return {
      provider: 'passkey' as AuthProviderType,
    };
  }

  public async signOut(): Promise<void> {
    // Passkey signOut is handled by the platform
  }

  public async isAvailable(): Promise<boolean> {
    return featureFlags.passkeyLogin && !!config.passkey.rpId;
  }
}

export default PasskeyAuthProvider;
