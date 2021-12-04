import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class RegisterUserDTO {
  @IsNotEmpty()
  @ApiProperty({ example: '01626318831' })
  readonly identifier?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Zahid Hasan' })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '123456' })
  readonly password?: string;
}
