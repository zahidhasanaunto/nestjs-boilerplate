import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAddressDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly division: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly district: string;

  @ApiProperty({ required: false })
  readonly upazila: string;

  @ApiProperty({ required: false })
  readonly union: string;

  @ApiProperty({ required: false })
  readonly village: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly address: string;
}
