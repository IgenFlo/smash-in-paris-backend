import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  GeocodingPlaceSearchResult,
  ReverseGeocodingFailureResult,
  ReverseGeocodingPlaceResult,
} from '../types/geocoding.types';
import axios from 'axios';

@Injectable()
export class GeocodingService {
  apiKey = process.env.GEOCODING_API_KEY;

  async search(search: string) {
    const url = `https://geocode.maps.co/search?q=${search}&api_key=${this.apiKey}`;
    const { data } = await axios.get<GeocodingPlaceSearchResult[]>(url);
    return data;
  }

  async reverseGeocodeWithLatLon({ lat, lon }: { lat: string; lon: string }) {
    try {
      const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${this.apiKey}`;
      const { data } = await axios.get<
        ReverseGeocodingPlaceResult | ReverseGeocodingFailureResult
      >(url);
      if ('error' in data) throw new NotFoundException(data.error);
      return data;
    } catch (error) {
      throw new BadRequestException('An error occurred about the address');
    }
  }
}
