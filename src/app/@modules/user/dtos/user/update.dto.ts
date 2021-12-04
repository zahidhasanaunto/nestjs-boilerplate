import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDTO {
  @ApiProperty({ required: false })
  readonly name: string;

  @ApiProperty({ required: false })
  readonly phoneNumber: string;

  @ApiProperty({ required: false })
  readonly email: string;

  @ApiProperty({ required: false })
  readonly password: string;

  @ApiProperty({ required: false })
  readonly designation: string;
}
