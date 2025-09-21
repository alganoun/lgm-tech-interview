import { BadRequestError, NotFoundError } from '../../core/errors/http-errors';
import { Logger } from '../../core/logger/logger';
import { MixPanelAnalyticsService } from '../analytics/services/mix-panel-analytics.service';
import { SegmentAnalyticsService } from '../analytics/services/segment-analytics.service';
import { AnalyticsData } from '../analytics/types/analytics-data.type';
import { UserRepository } from '../users/repositories/users.repository';
import { User } from '../users/types/user.type';
import { Gmail } from './helpers/gmail';

const logger = new Logger('MessagesService');

export class MessagesService {
  constructor(
    private readonly userRepository: UserRepository = new UserRepository(),
    private readonly segmentAnalyticsService: SegmentAnalyticsService = new SegmentAnalyticsService(),
    private readonly mixPanelAnalyticsService: MixPanelAnalyticsService = new MixPanelAnalyticsService(),
  ) {}

  async sendEmail(userId: string, content: string, emailTo: string, type: string) {
    const user: User = await this.userRepository.findById(userId);
    let success = false;
    if (!user) throw new NotFoundError('User not found');

    if (type === 'GMAIL') {
      if (user.credits > 0) {
        //TODO: switch case for other email providers if credit are due regarding the provider
        const gmail = new Gmail({
          secretToken: process.env.SECRET_TOKEN,
          appToken: process.env.APP_TOKEN,
        });
        await gmail.init();
        await gmail.sendEmail(content, emailTo, user.email);
        success = (await this.userRepository.update(userId, { $inc: { credits: -1 } }))
          ? true
          : false;
      } else {
        throw new BadRequestError('User has no credits');
      }
    }

    const result = !success ? 'Email failed' : 'Email sent';

    if (user.track) {
      const trackData: AnalyticsData = {
        message: result,
        userId: user._id.toString(),
        timestamp: new Date().getTime(),
        to: emailTo,
        content: !success ? content : undefined,
      };

      if (process.env.ENV === 'prod') {
        await this.mixPanelAnalyticsService.track(trackData);
      }

      await this.segmentAnalyticsService.track(trackData);
      logger.info(result);
      return result;
    }
  }
}
