import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from '../dtos/login-user.dto';
import { RegisterUserDTO } from '../dtos/register-user.dto';
import { AuthService } from './../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginUserDTO })
  async loginUser(@Body() loginUserDto: LoginUserDTO): Promise<any> {
    return this.service.loginUserUsingLocal(loginUserDto);
  }

  @Post('register')
  @ApiBody({ type: RegisterUserDTO })
  async registerUser(@Body() registerUserDto: RegisterUserDTO): Promise<any> {
    return this.service.registerUserUsingLocal(registerUserDto);
  }
}
