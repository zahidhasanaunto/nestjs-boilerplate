import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '01636476123' })
  readonly identifier: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  readonly password: string;
}
