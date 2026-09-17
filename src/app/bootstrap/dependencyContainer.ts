// Dependency injection container for services
// This allows easy mocking in tests and swapping implementations

import { authService } from '@features/auth';
import { sessionService } from '@features/auth';
import { accountLinkingService } from '@features/auth';
import { tokenManager } from '@core/security';
import { secureStorage } from '@core/storage';
import { storage } from '@core/storage';
import { networkService } from '@core/network';
import { logger } from '@core/logging';

export const services = {
  auth: authService,
  session: sessionService,
  accountLinking: accountLinkingService,
  token: tokenManager,
  secureStorage,
  storage,
  network: networkService,
  logger,
};

export default services;
