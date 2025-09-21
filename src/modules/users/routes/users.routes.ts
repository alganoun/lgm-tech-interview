import { Router } from 'express';
import { HandleResponse } from '../../../core/middleware/response';
import { UsersController } from '../users.controller';

const router = Router();
const usersController = new UsersController();

router.get('/:userId', HandleResponse(usersController.getUser));

export default router;
