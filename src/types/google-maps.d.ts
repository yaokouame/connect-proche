
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, options: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      panTo(latLng: LatLng | LatLngLiteral): void;
      setOptions(options: MapOptions): void;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setPosition(latLng: LatLng | LatLngLiteral): void;
      setMap(map: Map | null): void;
      setAnimation(animation: any): void;
      addListener(event: string, handler: Function): MapsEventListener;
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

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapsEventListener {
      remove(): void;
    }

    interface MapOptions {
      center: LatLng | LatLngLiteral;
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
      position: LatLng | LatLngLiteral;
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
        location: LatLng | LatLngLiteral;
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
