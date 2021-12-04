import { ApiProperty } from '@nestjs/swagger';

export class UserBulkUpdateDTO {
  @ApiProperty({ required: true, example: ['id1', 'id2'] })
  readonly ids: string[];

  @ApiProperty({ required: false })
  readonly name: string;

  @ApiProperty({ required: false })
  readonly email: string;

  @ApiProperty({ required: false })
  readonly phoneNumber: string;

  @ApiProperty({ required: false })
  readonly designation: string;

  @ApiProperty({ required: false })
  readonly password: string;
}
