const SENSITIVE_KEYS = [
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
  'secret',
  'apiKey',
  'creditCard',
  'ssn',
  'socialSecurityNumber',
  'passkey',
  'credential',
];

export const sanitizeLogData = (data: unknown): unknown => {
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
    return data.map(item => sanitizeLogData(item));
  }

  if (typeof data === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const lowerKey = key.toLowerCase();
        if (SENSITIVE_KEYS.some(sensitiveKey => lowerKey.includes(sensitiveKey))) {
          sanitized[key] = '[REDACTED]';
        } else {
          sanitized[key] = sanitizeLogData(data[key as keyof typeof data]);
        }
      }
    }
    return sanitized;
  }

  return data;
};

export default sanitizeLogData;
