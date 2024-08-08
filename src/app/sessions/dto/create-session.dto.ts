import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class LatLon {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lon: string;
}

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  seatsCount: number;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LatLon)
  latLon: LatLon;
}
