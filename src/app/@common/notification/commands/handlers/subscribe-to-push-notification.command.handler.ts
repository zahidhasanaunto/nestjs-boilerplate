import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubscribeToPushNotificationCommand } from '../subscribe-to-push-notification.command';
import { NotificationSubscriptionService } from '../../services/notification-subscription.service';

@CommandHandler(SubscribeToPushNotificationCommand)
export class SubscribeToPushNotificationHandler
  implements ICommandHandler<SubscribeToPushNotificationCommand, void>
{
  constructor(
    private readonly notificationService: NotificationSubscriptionService
  ) {}

  async execute(command: SubscribeToPushNotificationCommand): Promise<void> {
    await this.notificationService.createNotificationSubscription(command);
  }
}
