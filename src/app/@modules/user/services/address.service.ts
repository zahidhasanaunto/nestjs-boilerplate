import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/app/@application/base/base.service';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly service: Repository<Address>
  ) {
    super(service, Address.name);
  }
}
