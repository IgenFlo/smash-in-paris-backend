import { Controller, Get, Param } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import {
  GeocodingPlaceSearchResult,
  ReverseGeocodingPlaceResult,
} from '../types/geocoding.types';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorators';

@ApiTags('Geocoding')
@Controller('geocoding')
export class GeocodingController {
  constructor(private geocodingService: GeocodingService) {}

  @Public()
  @Get('search/:search')
  async search(
    @Param('search') search: string,
  ): Promise<GeocodingPlaceSearchResult[]> {
    return this.geocodingService.search(search);
  }

  @Public()
  @Get('reverse/:lat/:lon')
  async reverse(
    @Param('lat') lat: string,
    @Param('lon') lon: string,
  ): Promise<ReverseGeocodingPlaceResult> {
    return this.geocodingService.reverseGeocodeWithLatLon({ lat, lon });
  }
}
