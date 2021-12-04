import { ENV } from '../../../ENV';
import { BullModule } from '@anchan828/nest-bullmq';
import { SendNotificationHandler } from './commands/handlers/send-notification.command.handler';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribeToPushNotificationHandler } from './commands/handlers/subscribe-to-push-notification.command.handler';
import { NotificationController } from './controllers/notification.controller';
import {
  NotificationSubscription,
  NotificationSubscriptionSchema,
} from './models/notification-subscription';
import { NotificationSubscriptionService } from './services/notification-subscription.service';
import { SendNotificationWorker } from './workers/send-notification.worker';
import { HttpModule } from '@nestjs/axios';

const handlers = [SubscribeToPushNotificationHandler, SendNotificationHandler];
const controllers = [NotificationController];
const services = [NotificationSubscriptionService];
const workers = [SendNotificationWorker];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: NotificationSubscription.name,
        schema: NotificationSubscriptionSchema,
      },
    ]),
    HttpModule,
    BullModule.registerQueue(ENV.NOTIFICATION_QUEUE),
  ],
  controllers: [...controllers],
  providers: [...handlers, ...services, ...workers],
})
export class NotificationModule {}
