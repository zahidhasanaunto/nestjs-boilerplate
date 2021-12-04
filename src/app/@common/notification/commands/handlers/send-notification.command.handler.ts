import { BullQueueInject } from '@anchan828/nest-bullmq';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Queue } from 'bullmq';
import { asyncForEach } from 'src/app/@application/utils/util.function';
import { ENV } from 'src/ENV';
import { NotificationSubscription } from '../../models/notification-subscription';
import { NotificationSubscriptionService } from '../../services/notification-subscription.service';
import { SendNotificationCommand } from '../send-notification.command';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler
  implements ICommandHandler<SendNotificationCommand, void>
{
  constructor(
    @BullQueueInject(ENV.NOTIFICATION_QUEUE)
    private readonly queue: Queue,
    private readonly notificationService: NotificationSubscriptionService
  ) {}

  async execute(command: SendNotificationCommand): Promise<void> {
    const data: NotificationSubscription[] =
      await this.notificationService.getNotificationSubscriptions();

    await asyncForEach(data, async (nS: NotificationSubscription) => {
      await this.queue.add(ENV.NOTIFICATION_QUEUE, {
        message: command.message,
        title: command.title,
        token: nS.token,
      });
    });
  }
}
