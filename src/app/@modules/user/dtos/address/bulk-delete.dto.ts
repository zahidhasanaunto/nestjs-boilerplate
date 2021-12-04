import { ApiProperty } from '@nestjs/swagger';

export class AddressBulkDeleteDTO {
  @ApiProperty({ required: true, example: ['id1', 'id2'] })
  readonly ids: string[];
}
