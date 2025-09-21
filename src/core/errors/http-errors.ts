import { AppError, ErrorDetails } from './app-errors';

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details?: ErrorDetails) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found', details?: ErrorDetails) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', details?: ErrorDetails) {
    super(message, 500, 'INTERNAL_ERROR', details);
  }
}
