import 'dotenv/config';
import { createApp } from './app';
import { loadDbClient } from './core/db/nestdb.client';
import { Logger } from './core/logger/logger';

const logger = new Logger('App');

async function bootstrap() {
  logger.info('Starting server...');

  const port = process.env.PORT;

  loadDbClient();

  const app = await createApp();

  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port} 🚀`);
  });
}

bootstrap();
