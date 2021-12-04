import { ApiProperty } from '@nestjs/swagger';

export class PatientBulkDeleteDTO {
  @ApiProperty({ required: true, example: ['id1', 'id2'] })
  readonly ids: string[];
}
