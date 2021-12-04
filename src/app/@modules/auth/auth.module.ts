import { Module } from '@nestjs/common';
import { HelperModule } from 'src/app/@application/helpers/helper.module';
import { UserModule } from './../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

const services = [AuthService];
const controllers = [AuthController];

@Module({
  imports: [HelperModule, UserModule],
  controllers: [...controllers],
  providers: [...services],
})
export class AuthModule {}
