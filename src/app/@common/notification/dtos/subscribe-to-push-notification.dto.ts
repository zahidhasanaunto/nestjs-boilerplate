import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribeToPushNotificationDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;
}
