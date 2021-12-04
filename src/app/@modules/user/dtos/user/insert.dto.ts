import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly designation: string;
}
