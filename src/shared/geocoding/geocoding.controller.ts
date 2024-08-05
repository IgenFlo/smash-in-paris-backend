import { Controller, Get, Param } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { GeocodingPlace } from '../types/geocoding.types';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorators';

@ApiTags('Geocoding')
@Controller('geocoding')
export class GeocodingController {
  constructor(private geocodingService: GeocodingService) {}

  @Public()
  @Get('search/:search')
  async search(@Param('search') search: string): Promise<GeocodingPlace[]> {
    return this.geocodingService.search(search);
  }
}
