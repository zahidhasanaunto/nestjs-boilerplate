import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterDTO } from 'src/app/@application/base/base-filter.dto';

export class GetAllPatientsDTO extends BaseFilterDTO {
  @ApiProperty({ required: false })
  readonly firstName: string;

  @ApiProperty({ required: false })
  readonly lastName: string;

  @ApiProperty({ required: false })
  readonly email: string;

  @ApiProperty({ required: false })
  readonly phoneNumber: string;

  @ApiProperty({ required: false })
  readonly gender: string;

  @ApiProperty({ required: false })
  readonly dob: string;

  @ApiProperty({ required: false })
  readonly hid: string;
}
