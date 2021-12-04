import { ApiProperty } from '@nestjs/swagger';

export class PatientUpdateDTO {
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
