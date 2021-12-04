import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterDTO } from 'src/app/@application/base/base-filter.dto';

export class GetAllUsersDTO extends BaseFilterDTO {
  @ApiProperty({ required: false })
  readonly name: string;

  @ApiProperty({ required: false })
  readonly email: string;

  @ApiProperty({ required: false })
  readonly phoneNumber: string;

  @ApiProperty({ required: false })
  readonly designation: string;
}
