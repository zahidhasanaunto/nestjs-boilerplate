import { InjectConnection } from '@nestjs/typeorm';
import { BcryptHelper } from 'src/app/@application/helpers';
import Container from 'typedi';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  public async beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password) {
      event.entity.password = await this._hashPassword(event.entity.password);
    }
  }

  public async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity.password) {
      event.entity.password = await this._hashPassword(event.entity.password);
    }
  }

  private async _hashPassword(password: any) {
    const bcryptHelper = Container.get(BcryptHelper);
    return bcryptHelper.hashString(password);
  }
}
