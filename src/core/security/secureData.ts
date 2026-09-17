export class SecureData {
  private static instance: SecureData;

  private constructor() {}

  public static getInstance(): SecureData {
    if (!SecureData.instance) {
      SecureData.instance = new SecureData();
    }
    return SecureData.instance;
  }

  public maskEmail(email: string): string {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const maskedLocal = local.length > 2
      ? `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}`
      : '*'.repeat(local.length);
    return `${maskedLocal}@${domain}`;
  }

  public maskPhoneNumber(phone: string): string {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 4) return phone;
    const lastFour = cleaned.slice(-4);
    return `***-***-${lastFour}`;
  }

  public maskCreditCard(cardNumber: string): string {
    if (!cardNumber) return '';
    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.length < 4) return cardNumber;
    const lastFour = cleaned.slice(-4);
    return `•••• ${lastFour}`;
  }

  public maskSSN(ssn: string): string {
    if (!ssn) return '';
    const cleaned = ssn.replace(/\D/g, '');
    if (cleaned.length < 4) return ssn;
    const lastFour = cleaned.slice(-4);
    return `***-**-${lastFour}`;
  }

  public maskToken(token: string, visibleChars: number = 8): string {
    if (!token) return '';
    if (token.length <= visibleChars * 2) return '••••';
    const start = token.slice(0, visibleChars);
    const end = token.slice(-visibleChars);
    return `${start}...${end}`;
  }

  public sanitizeForLogging(data: unknown): unknown {
    if (data === null || data === undefined) {
      return data;
    }

    if (typeof data === 'string') {
      return data;
    }

    if (typeof data === 'number' || typeof data === 'boolean') {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeForLogging(item));
    }

    if (typeof data === 'object') {
      const sanitized: Record<string, unknown> = {};
      const sensitiveKeys = [
        'password',
        'token',
        'accessToken',
        'refreshToken',
        'secret',
        'apiKey',
        'creditCard',
        'ssn',
        'socialSecurityNumber',
        'passkey',
        'credential',
        'authorization',
      ];

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const lowerKey = key.toLowerCase();
          if (sensitiveKeys.some(sensitiveKey => lowerKey.includes(sensitiveKey))) {
            sanitized[key] = '[REDACTED]';
          } else {
            sanitized[key] = this.sanitizeForLogging(data[key as keyof typeof data]);
          }
        }
      }
      return sanitized;
    }

    return data;
  }
}

export const secureData = SecureData.getInstance();

export default secureData;
