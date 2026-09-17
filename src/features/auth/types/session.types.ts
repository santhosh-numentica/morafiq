export interface Session {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  provider: string;
  createdAt: number;
  lastActivity: number;
}

export interface SessionMetadata {
  deviceId: string;
  deviceName: string;
  platform: string;
  appVersion: string;
}
