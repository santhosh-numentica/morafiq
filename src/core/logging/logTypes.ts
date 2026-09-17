import { LogLevel } from '@core/types';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

export type LogHandler = (entry: LogEntry) => void;
