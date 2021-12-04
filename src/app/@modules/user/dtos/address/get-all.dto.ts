import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterDTO } from 'src/app/@application/base/base-filter.dto';

export class GetAllAddressesDTO extends BaseFilterDTO {
  @ApiProperty({ required: false })
  readonly division: string;

  @ApiProperty({ required: false })
  readonly district: string;

  @ApiProperty({ required: false })
  readonly upazila: string;

  @ApiProperty({ required: false })
  readonly union: string;

  @ApiProperty({ required: false })
  readonly village: string;

  @ApiProperty({ required: false })
  readonly address: string;
}
