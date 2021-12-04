import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationSubscription } from '../models/notification-subscription';
import { SubscribeToPushNotificationDTO } from '../dtos/subscribe-to-push-notification.dto';

@Injectable()
export class NotificationSubscriptionService {
  constructor(
    @InjectModel(NotificationSubscription.name)
    private readonly model: Model<NotificationSubscription>
  ) {}

  async getNotificationSubscriptions(): Promise<NotificationSubscription[]> {
    return await this.model.find({}).exec();
  }

  async createNotificationSubscription(
    data: SubscribeToPushNotificationDTO
  ): Promise<NotificationSubscription> {
    const res = new this.model(data);
    return await res.save();
  }
}
