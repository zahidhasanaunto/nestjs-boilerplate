import { ICommand } from '@nestjs/cqrs';

export class SendNotificationCommand implements ICommand {
  constructor(readonly message: string, readonly title: string) {}
}
