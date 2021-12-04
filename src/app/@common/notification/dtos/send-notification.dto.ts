import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly message: string;

  @IsString()
  @ApiProperty()
  readonly title: string;
}
