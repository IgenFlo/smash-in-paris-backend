import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchSessionsFiltersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lon: string;
}
