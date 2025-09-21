import { NotFoundError } from '../../core/errors/http-errors';
import { UserRepository } from './repositories/users.repository';
import { User } from './types/user.type';

class UsersService {
  constructor(private readonly repository: UserRepository = new UserRepository()) {}

  async getUser(userId: string): Promise<User> {
    const user = await this.repository.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }
}

export default UsersService;
