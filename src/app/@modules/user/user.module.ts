import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/app/@application/helpers/helper.module';
import { AddressController } from './controllers/address.controller';
import { PatientController } from './controllers/patient.controller';
import { UserController } from './controllers/user.controller';
import { Address } from './entities/address.entity';
import { Patient } from './entities/patient.entity';
import { User } from './entities/user.entity';
import { AddressService } from './services/address.service';
import { PatientService } from './services/patient.service';
import { UserService } from './services/user.service';
import { UserSubscriber } from './subscribers/user.subscriber';

const controllers = [UserController, PatientController, AddressController];
const services = [UserService, PatientService, AddressService];
const entities = [User, Patient, Address];
const subscribers = [UserSubscriber];

@Module({
  imports: [TypeOrmModule.forFeature(entities), HelperModule],
  controllers: [...controllers],
  providers: [...services, ...subscribers],
  exports: [...services],
})
export class UserModule {}
