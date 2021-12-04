import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationSubscriptionDocument = NotificationSubscription &
  Document;

@Schema()
export class NotificationSubscription {
  @Prop()
  userId: string;

  @Prop()
  token: string;
}

export const NotificationSubscriptionSchema = SchemaFactory.createForClass(
  NotificationSubscription
);
