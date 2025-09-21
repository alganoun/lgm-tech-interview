import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-errors';
import { Logger } from '../logger/logger';

const logger = new Logger('ErrorHandler');

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  const isAppError = err instanceof AppError;
  const status = isAppError ? err.statusCode : 500;
  const code = isAppError ? err.code : 'INTERNAL_ERROR';
  const message = isAppError ? err.message : 'Internal Server Error';
  const details = isAppError ? err.details : undefined;

  logger.error(err);
  return res.status(status).json({
    status: 'error',
    code,
    message,
    details,
  });
}
