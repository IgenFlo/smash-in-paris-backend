export interface GeocodingPlaceSearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export interface ReverseGeocodingPlaceResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    house_number: string;
    road: string;
    neighbourhood: string;
    suburb: string;
    city: string;
    municipality: string;
    county: string;
    'ISO3166-2-lvl6': string;
    state: string;
    'ISO3166-2-lvl4': string;
    region: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
}

export interface ReverseGeocodingFailureResult {
  error: string;
}
