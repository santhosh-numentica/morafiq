import { secureData } from './secureData';

export const sanitizeForLogging = (data: unknown): unknown => {
  return secureData.sanitizeForLogging(data);
};

export default sanitizeForLogging;
