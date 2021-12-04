import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/app/@application/base/base.service';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class PatientService extends BaseService<Patient> {
  constructor(
    @InjectRepository(Patient)
    private readonly service: Repository<Patient>
  ) {
    super(service, Patient.name);
  }
}
