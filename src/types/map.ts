
import { Pharmacy, HealthCenter } from "./user";

export interface Location {
  lat: number;
  lng: number;
}

export interface GoogleMapRef {
  centerMapOnLocation: (location: Location) => void;
}

export interface PlaceDetails {
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  opening_hours?: {
    weekday_text?: string[];
  };
  rating?: number;
  website?: string;
  place_id: string;
  vicinity: string;
  types?: string[];
}

