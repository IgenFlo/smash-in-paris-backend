import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  discordId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  discordUsername: string;
}
