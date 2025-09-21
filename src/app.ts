import Express from 'express';
import { NotFoundError } from './core/errors/http-errors';
import { errorHandler } from './core/middleware/error';
import messagesRoutes from './modules/messages/routes/messages.routes';
import userRoutes from './modules/users/routes/users.routes';

export async function createApp(): Promise<Express.Application> {
  const app = Express();
  app.use(Express.json());

  //Modules routes
  app.use('/users', userRoutes);
  app.use('/messages', messagesRoutes);

  //Error handling
  app.use((req, res, next) => {
    next(new NotFoundError('Route not found'));
  });
  app.use(errorHandler);

  return app;
}
