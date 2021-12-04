import { ICommand } from '@nestjs/cqrs';

export class SubscribeToPushNotificationCommand implements ICommand {
  constructor(readonly userId: string, readonly token: string) {}
}
