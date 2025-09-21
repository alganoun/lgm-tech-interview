import { BadRequestError } from '../../core/errors/http-errors';
import { UserRequest } from './types/user-request.type';
import UsersService from './users.service';

export class UsersController {
  constructor(private readonly userService: UsersService = new UsersService()) {}

  getUser = ({ params }: UserRequest) => {
    if (!params.userId) {
      throw new BadRequestError('User ID is required');
    }
    return this.userService.getUser(params.userId);
  };
}
