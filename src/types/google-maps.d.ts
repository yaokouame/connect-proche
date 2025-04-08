
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, options: MapOptions);
      setCenter(latLng: LatLng): void;
      setZoom(zoom: number): void;
      panTo(latLng: LatLng): void;
      setOptions(options: MapOptions): void;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setPosition(latLng: LatLng): void;
      setMap(map: Map | null): void;
      setAnimation(animation: any): void;
      addListener(event: string, handler: Function): void;
    }

    class InfoWindow {
      constructor(options?: InfoWindowOptions);
      setContent(content: string | Node): void;
      open(map: Map, anchor?: Marker): void;
      close(): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface MapOptions {
      center: LatLng;
      zoom: number;
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      styles?: any[];
      mapTypeId?: string;
      fullscreenControl?: boolean;
      streetViewControl?: boolean;
      mapTypeControl?: boolean;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      title?: string;
      icon?: string | Icon;
      animation?: any;
      draggable?: boolean;
    }

    interface InfoWindowOptions {
      content?: string | Node;
      maxWidth?: number;
      pixelOffset?: Size;
    }

    interface Icon {
      url: string;
      scaledSize?: Size;
      origin?: Point;
      anchor?: Point;
    }

    class Size {
      constructor(width: number, height: number);
    }

    class Point {
      constructor(x: number, y: number);
    }

    namespace places {
      class PlacesService {
        constructor(map: Map | HTMLElement);
        nearbySearch(request: NearbySearchRequest, callback: (results: PlaceResult[], status: PlacesServiceStatus, pagination: any) => void): void;
        getDetails(request: DetailsRequest, callback: (result: PlaceResult, status: PlacesServiceStatus) => void): void;
      }

      interface NearbySearchRequest {
        location: LatLng;
        radius: number;
        type?: string;
        keyword?: string;
        rankBy?: any;
      }

      interface DetailsRequest {
        placeId: string;
        fields?: string[];
      }

      interface PlaceResult {
        geometry: {
          location: LatLng;
        };
        name: string;
        vicinity: string;
        place_id: string;
        types: string[];
        rating?: number;
        opening_hours?: {
          open_now?: boolean;
        };
        photos?: {
          getUrl: (options: { maxWidth?: number; maxHeight?: number }) => string;
        }[];
        formatted_address?: string;
        formatted_phone_number?: string;
        website?: string;
        international_phone_number?: string;
      }

      const PlacesServiceStatus: {
        OK: string;
        ZERO_RESULTS: string;
        OVER_QUERY_LIMIT: string;
        REQUEST_DENIED: string;
        INVALID_REQUEST: string;
        UNKNOWN_ERROR: string;
      };
    }

    const Animation: {
      DROP: any;
      BOUNCE: any;
    };

    const SymbolPath: {
      CIRCLE: any;
      FORWARD_CLOSED_ARROW: any;
      FORWARD_OPEN_ARROW: any;
      BACKWARD_CLOSED_ARROW: any;
      BACKWARD_OPEN_ARROW: any;
    };
  }
}
