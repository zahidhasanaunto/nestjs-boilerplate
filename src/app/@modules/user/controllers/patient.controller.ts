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
import { PatientBulkDeleteDTO } from '../dtos/patient/bulk-delete.dto';
import { PatientBulkUpdateDTO } from '../dtos/patient/bulk-update.dto';
import { GetAllPatientsDTO } from '../dtos/patient/get-all.dto';
import { CreatePatientDTO } from '../dtos/patient/insert.dto';
import { PatientUpdateDTO } from '../dtos/patient/update.dto';
import { PatientService } from '../services/patient.service';
import { Patient } from '../entities/patient.entity';

@ApiTags('Patient')
@ApiBearerAuth()
@Controller('patients')
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @Get()
  @ApiProperty({ type: GetAllPatientsDTO })
  async getAll(
    @RequestOptions() reqOptions: IOptions,
    @Query() reqPayloads: GetAllPatientsDTO
  ): Promise<IGetAllFromDBResponse<Patient>> {
    return this.service.getAllFromDB(reqPayloads, reqOptions);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Patient> {
    return this.service.getByIdFromDB(id);
  }

  @Post()
  @ApiBody({ type: CreatePatientDTO })
  async insert(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: CreatePatientDTO
  ): Promise<Patient> {
    return this.service.insertIntoDB(reqPayloads);
  }

  @Put('bulk-update')
  @ApiBody({ type: PatientBulkUpdateDTO })
  async bulkUpdate(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: PatientBulkUpdateDTO
  ): Promise<IMessageOnlyResponse> {
    return this.service.bulkUpdateIntoDB(reqOptions, reqPayloads);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() reqPayloads: PatientUpdateDTO
  ): Promise<Patient> {
    return this.service.updateIntoDB(id, reqPayloads);
  }

  @Delete('bulk-delete')
  @ApiBody({ type: PatientBulkDeleteDTO })
  async bulkDelete(
    @RequestOptions() reqOptions: IOptions,
    @Body() reqPayloads: PatientBulkDeleteDTO
  ): Promise<IMessageOnlyResponse> {
    return this.service.bulkDeleteFromDB(reqOptions);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IMessageOnlyResponse> {
    return this.service.deleteFromDB(id);
  }
}
