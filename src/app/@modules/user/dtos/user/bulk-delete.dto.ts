import { ApiProperty } from '@nestjs/swagger';

export class UserBulkDeleteDTO {
  @ApiProperty({ required: true, example: ['id1', 'id2'] })
  readonly ids: string[];
}
