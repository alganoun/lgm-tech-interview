import { Logger } from '../logger/logger';

const Datastore = require('nestdb');
const logger = new Logger('NestdbClient');

export const dbClient = new Datastore({ filename: process.env.DB_FILE });

export function loadDbClient() {
  dbClient.load();
  logger.info('Database client loaded');
}
