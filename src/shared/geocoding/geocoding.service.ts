import { Injectable } from '@nestjs/common';
import { GeocodingPlace } from '../types/geocoding.types';
import axios from 'axios';

@Injectable()
export class GeocodingService {
  apiKey = process.env.GEOCODING_API_KEY;

  async search(search: string) {
    const url = `https://geocode.maps.co/search?q=${search}&api_key=${this.apiKey}`;
    const { data } = await axios.get<GeocodingPlace[]>(url);
    return data;
  }
}
