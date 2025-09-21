import { dbClient } from '../../../core/db/nestdb.client';
import { Logger } from '../../../core/logger/logger';
import { User } from '../types/user.type';

const logger = new Logger('UserRepository');

export class UserRepository {
  constructor(private readonly client: any = dbClient) {}

  async findById(userId: string): Promise<User> {
    const user: User = await new Promise((resolve, reject) => {
      this.client.findOne({ _id: userId }, { upsert: false }, function (err: any, doc: any) {
        if (err) {
          logger.error(err as string);
          reject(err);
        }
        resolve(doc);
      });
    });
    return user;
  }

  async update(userId: string, update: {}): Promise<User> {
    return new Promise((resolve, reject) => {
      this.client.update({ _id: userId }, update, function (err: any, doc: any) {
        try {
          resolve(doc);
        } catch (error) {
          logger.error(error as string);
          reject(error);
        }
      });
    });
  }
}
