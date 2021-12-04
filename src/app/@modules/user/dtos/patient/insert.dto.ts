import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreatePatientDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly gender: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly dob: string;

  @ApiProperty({ required: false })
  readonly hid: string;
}
