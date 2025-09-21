import { Router } from 'express';
import { HandleResponse } from '../../../core/middleware/response';
import { MessageController } from '../messages.controller';

const router = Router();
const messageController = new MessageController();

router.post('/:type', HandleResponse(messageController.sendMessage));

export default router;
