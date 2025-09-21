import { BadRequestError } from '../../core/errors/http-errors';
import { MessagesService } from './messages.service';
import { MessageRequest } from './types/message-request.type';

export class MessageController {
  constructor(private readonly messagesService: MessagesService = new MessagesService()) {}

  sendMessage = ({ body, params }: MessageRequest) => {
    if (!body.userId || !body.content || !body.emailTo || !params.type) {
      throw new BadRequestError('Missing required fields');
    }
    return this.messagesService.sendEmail(body.userId, body.content, body.emailTo, params.type);
  };
}
