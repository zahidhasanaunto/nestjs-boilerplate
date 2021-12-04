import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { SendNotificationCommand } from '../commands/send-notification.command';
import { SendNotificationDTO } from '../dtos/send-notification.dto';
import { SubscribeToPushNotificationDTO } from '../dtos/subscribe-to-push-notification.dto';
import { SubscribeToPushNotificationCommand } from '../commands/subscribe-to-push-notification.command';

@ApiTags('Notications')
@Controller('notifications')
export class NotificationController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post('subscribe')
  async subscribe(@Body() body: SubscribeToPushNotificationDTO): Promise<any> {
    const command = new SubscribeToPushNotificationCommand(
      body.userId,
      body.token
    );
    await this.commandBus.execute(command);

    return { message: 'Subscribed to push notification' };
  }

  @Post('send')
  async send(@Body() body: SendNotificationDTO): Promise<any> {
    const command = new SendNotificationCommand(body.message, body.title);
    await this.commandBus.execute(command);

    return { message: 'Notification sent!' };
  }
}
