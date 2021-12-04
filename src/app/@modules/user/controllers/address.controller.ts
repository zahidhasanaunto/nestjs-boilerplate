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
import { AddressBulkDeleteDTO } from '../dtos/address/bulk-delete.dto';
import { AddressBulkUpdateDTO } from '../dtos/address/bulk-update.dto';
import { GetAllAddressesDTO } from '../dtos/address/get-all.dto';
import { CreateAddressDTO } from '../dtos/address/insert.dto';
import { AddressUpdateDTO } from '../dtos/address/update.dto';
import { Address } from '../entities/address.entity';
import { AddressService } from '../services/address.service';

@ApiTags('Address')
@ApiBearerAuth()
@Controller('addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Get()
  @ApiProperty({ type: GetAllAddressesDTO })
  async getAll(
    @RequestOptions() reqOptions: IOptions,
    @Query() reqPayloads: GetAllAddressesDTO
  ): Promise<IGetAllFromDBResponse<Address>> {
    return this.service.getAllFromDB(reqPayloads, reqOptions);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Address> {
    return this.service.getByIdFromDB(id);
  }

  @Post()
  @ApiBody({ type: CreateAddressDTO })
  async insert(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: CreateAddressDTO
  ): Promise<Address> {
    return this.service.insertIntoDB(reqPayloads);
  }

  @Put('bulk-update')
  @ApiBody({ type: AddressBulkUpdateDTO })
  async bulkUpdate(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: AddressBulkUpdateDTO
  ): Promise<IMessageOnlyResponse> {
    return this.service.bulkUpdateIntoDB(reqOptions, reqPayloads);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() reqPayloads: AddressUpdateDTO
  ): Promise<Address> {
    return this.service.updateIntoDB(id, reqPayloads);
  }

  @Delete('bulk-delete')
  @ApiBody({ type: AddressBulkDeleteDTO })
  async bulkDelete(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: AddressBulkDeleteDTO
  ): Promise<IMessageOnlyResponse> {
    return this.service.bulkDeleteFromDB(reqOptions);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IMessageOnlyResponse> {
    return this.service.deleteFromDB(id);
  }
}
