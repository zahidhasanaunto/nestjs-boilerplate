import { ApiProperty } from '@nestjs/swagger';

export class AddressUpdateDTO {
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
