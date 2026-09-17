import { LogLevel } from '@core/types';
import { LogEntry, LogHandler } from './logTypes';
import { sanitizeLogData } from './logSanitizer';
import { config } from '@app/config/environment';

class Logger {
  private handlers: LogHandler[] = [];
  private minLevel: LogLevel;

  constructor() {
    this.minLevel = config.logging.level;
    this.setupConsoleHandler();
  }

  private setupConsoleHandler(): void {
    if (__DEV__) {
      this.addHandler(entry => {
        const timestamp = entry.timestamp.toISOString();
        const contextStr = entry.context ? ` ${JSON.stringify(sanitizeLogData(entry.context))}` : '';
        const message = `[${timestamp}] [${entry.level.toUpperCase()}] ${entry.message}${contextStr}`;

        switch (entry.level) {
          case 'debug':
            console.debug(message);
            break;
          case 'info':
            console.info(message);
            break;
          case 'warn':
            console.warn(message);
            break;
          case 'error':
            console.error(message);
            break;
          case 'silent':
            break;
        }
      });
    }
  }

  public addHandler(handler: LogHandler): void {
    this.handlers.push(handler);
  }

  public setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'silent'];
    const currentLevelIndex = levels.indexOf(this.minLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex && level !== 'silent';
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context: context ? (sanitizeLogData(context) as Record<string, unknown>) : undefined,
    };

    this.handlers.forEach(handler => {
      try {
        handler(entry);
      } catch (error) {
        console.error('Log handler error:', error);
      }
    });
  }

  public debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, context);
  }

  public info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  public error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context);
  }
}

export const logger = new Logger();

export default logger;
