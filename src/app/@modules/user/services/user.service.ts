import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/app/@application/base/base.service';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from '../../auth/dtos/register-user.dto';
import { User } from '../entities/user.entity';
import { isEmail, isNumber } from './../../../@application/utils/util.function';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly service: Repository<User>
  ) {
    super(service, User.name);
  }

  async checkIfUserExist(identifier: string): Promise<User | any> {
    try {
      let isUserExist = undefined;

      if (isNumber(identifier)) {
        isUserExist = await this.getByCriteriaFromDB(
          { phoneNumber: identifier },
          {
            single: true,
            selects: [
              'id',
              'phoneNumber',
              'email',
              'name',
              'password',
              'designation',
            ],
          }
        );
      } else if (isEmail(identifier)) {
        isUserExist = await this.getByCriteriaFromDB(
          { email: identifier },
          {
            single: true,
            selects: [
              'id',
              'phoneNumber',
              'email',
              'name',
              'password',
              'designation',
            ],
          }
        );
      } else {
        return false;
      }

      if (isUserExist) {
        return isUserExist;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async registerUserUsingLocal(data: RegisterUserDTO): Promise<User | unknown> {
    try {
      let newUser: User = {};

      newUser.name = data?.name;
      newUser.password = data?.password;

      if (isNumber(data.identifier)) {
        newUser.phoneNumber = data.identifier;
      } else if (isEmail(data.identifier)) {
        newUser.email = data.identifier;
      } else {
        return false;
      }

      const createdUser: User = await this.insertIntoDB(newUser);

      if (createdUser) {
        return createdUser;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
