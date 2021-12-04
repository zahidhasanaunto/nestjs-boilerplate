import { ApiProperty } from '@nestjs/swagger';

export class BaseFilterDTO {
  @ApiProperty({ required: false, description: 'abc' })
  readonly searchTerm: string;

  // @ApiProperty({ required: false, description: "['2020-04-08', '2020-06-02']" })
  // readonly between: string;

  // @ApiProperty({ required: false, description: '2021-04-08' })
  // readonly before: string;

  // @ApiProperty({ required: false, description: '2021-04-06' })
  // readonly after: string;

  @ApiProperty({ required: false, description: '10' })
  readonly take: number;

  @ApiProperty({ required: false, description: '1' })
  readonly page: number;

  @ApiProperty({ required: false, description: 'false' })
  readonly fetchAll: boolean;

  @ApiProperty({ required: false, description: 'false' })
  readonly single: boolean;
}
