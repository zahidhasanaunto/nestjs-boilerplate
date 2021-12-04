import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RequestOptions } from 'src/app/@application/decorators';
import {
  IGetAllFromDBResponse,
  IMessageOnlyResponse,
  IOptions,
} from 'src/app/@application/interfaces';
import { UserBulkDeleteDTO } from '../dtos/user/bulk-delete.dto';
import { UserBulkUpdateDTO } from '../dtos/user/bulk-update.dto';
import { GetAllUsersDTO } from '../dtos/user/get-all.dto';
import { CreateUserDTO } from '../dtos/user/insert.dto';
import { UserUpdateDTO } from '../dtos/user/update.dto';
import { UserService } from '../services/user.service';
import { User } from './../entities/user.entity';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiProperty({ type: GetAllUsersDTO })
  async getAll(
    @RequestOptions() reqOptions: IOptions,
    @Query() reqPayloads: GetAllUsersDTO
  ): Promise<IGetAllFromDBResponse<User>> {
    return this.service.getAllFromDB(reqPayloads, reqOptions);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.service.getByIdFromDB(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDTO })
  async insert(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: CreateUserDTO
  ): Promise<User> {
    return this.service.insertIntoDB(reqPayloads);
  }

  @Put('bulk-update')
  @ApiBody({ type: UserBulkUpdateDTO })
  async bulkUpdate(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: UserBulkUpdateDTO
  ): Promise<IMessageOnlyResponse> {
    return this.service.bulkUpdateIntoDB(reqOptions, reqPayloads);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() reqPayloads: UserUpdateDTO
  ): Promise<User> {
    return this.service.updateIntoDB(id, reqPayloads);
  }

  @Delete('bulk-delete')
  @ApiBody({ type: UserBulkDeleteDTO })
  async bulkDelete(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: UserBulkDeleteDTO
  ): Promise<IMessageOnlyResponse> {
    return this.service.bulkDeleteFromDB(reqOptions);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IMessageOnlyResponse> {
    return this.service.deleteFromDB(id);
  }
}
