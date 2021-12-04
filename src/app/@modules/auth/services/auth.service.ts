import { Injectable } from '@nestjs/common';
import { AuthError } from 'src/app/@application/errors';
import { BcryptHelper, JWTHelper } from 'src/app/@application/helpers';
import { User } from '../../user/entities/user.entity';
import { LoginUserDTO } from '../dtos/login-user.dto';
import { RegisterUserDTO } from '../dtos/register-user.dto';
import { UserService } from './../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    protected readonly bcryptHelper: BcryptHelper,
    private readonly jwtHelper: JWTHelper
  ) {}

  async registerUserUsingLocal(
    payload: RegisterUserDTO
  ): Promise<User | unknown> {
    const createdUser = await this.userService.registerUserUsingLocal(payload);

    if (!createdUser) {
      throw new AuthError('Registration Error');
    }

    return createdUser;
  }

  async loginUserUsingLocal(payload: LoginUserDTO): Promise<any> {
    const user: User = await this.userService.checkIfUserExist(
      payload.identifier
    );

    if (!user) {
      throw new AuthError('User Not Exist');
    }

    const isPassCorrect = await this.bcryptHelper.compareHash(
      payload.password,
      user.password
    );

    if (!isPassCorrect) {
      throw new AuthError('Invalid Password');
    }

    delete user.password;

    const resPayload = { ...user, permissions: [] };

    const token = await (
      await this.jwtHelper.makeAccessToken(resPayload)
    ).token;

    return { token, user };
  }
}
