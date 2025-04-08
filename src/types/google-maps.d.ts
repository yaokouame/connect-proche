
// Type definitions for Google Maps JavaScript API 3.45
// This adds minimal typing required for our GoogleMap component

declare namespace google.maps {
  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    clickableIcons?: boolean;
    disableDefaultUI?: boolean;
    disableDoubleClickZoom?: boolean;
    gestureHandling?: string;
    heading?: number;
    mapTypeControl?: boolean;
    mapTypeControlOptions?: MapTypeControlOptions;
    mapTypeId?: string;
    maxZoom?: number;
    minZoom?: number;
    restriction?: MapRestriction;
    rotateControl?: boolean;
    rotateControlOptions?: RotateControlOptions;
    scaleControl?: boolean;
    scaleControlOptions?: ScaleControlOptions;
    scrollwheel?: boolean;
    streetView?: StreetViewPanorama;
    streetViewControl?: boolean;
    streetViewControlOptions?: StreetViewControlOptions;
    styles?: MapTypeStyle[];
    tilt?: number;
    zoom?: number;
    zoomControl?: boolean;
    zoomControlOptions?: ZoomControlOptions;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
    toString(): string;
    toUrlValue(precision?: number): string;
    toJSON(): LatLngLiteral;
    equals(other: LatLng): boolean;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | Icon | Symbol;
    animation?: Animation;
    clickable?: boolean;
    cursor?: string;
    draggable?: boolean;
    label?: string | MarkerLabel;
    opacity?: number;
    optimized?: boolean;
    shape?: MarkerShape;
    visible?: boolean;
    zIndex?: number;
  }

  interface Icon {
    url?: string;
    anchor?: Point;
    path?: string | SymbolPath;
    fillColor?: string;
    fillOpacity?: number;
    scale?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
  }

  interface Symbol {
    path: string | SymbolPath;
    anchor?: Point;
    fillColor?: string;
    fillOpacity?: number;
    labelOrigin?: Point;
    rotation?: number;
    scale?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
  }

  interface InfoWindowOptions {
    content?: string | Node;
    disableAutoPan?: boolean;
    maxWidth?: number;
    pixelOffset?: Size;
    position?: LatLng | LatLngLiteral;
    zIndex?: number;
  }

  interface StreetViewControlOptions {
    position?: ControlPosition;
  }

  interface ZoomControlOptions {
    position?: ControlPosition;
  }

  interface RotateControlOptions {
    position?: ControlPosition;
  }

  interface ScaleControlOptions {
    style?: ScaleControlStyle;
  }

  interface MapTypeControlOptions {
    position?: ControlPosition;
    style?: MapTypeControlStyle;
  }

  interface MapRestriction {
    latLngBounds: LatLngBounds | LatLngBoundsLiteral;
    strictBounds?: boolean;
  }

  interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
  }

  interface LatLngBounds {
    contains(latLng: LatLng | LatLngLiteral): boolean;
    equals(other: LatLngBounds | LatLngBoundsLiteral): boolean;
    extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
    getCenter(): LatLng;
    getNorthEast(): LatLng;
    getSouthWest(): LatLng;
    intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean;
    isEmpty(): boolean;
    toJSON(): LatLngBoundsLiteral;
    toSpan(): LatLng;
    toString(): string;
    toUrlValue(precision?: number): string;
    union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds;
  }

  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    getCenter(): LatLng;
    getZoom(): number;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map, anchor?: MVCObject): void;
    setContent(content: string | Node): void;
  }

  interface MapsEventListener {
    remove(): void;
  }

  class MVCObject {
    constructor();
  }

  interface Point {
    x: number;
    y: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface MarkerLabel {
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    text: string;
  }

  interface MarkerShape {
    coords: number[];
    type: string;
  }

  enum SymbolPath {
    BACKWARD_CLOSED_ARROW,
    BACKWARD_OPEN_ARROW,
    CIRCLE,
    FORWARD_CLOSED_ARROW,
    FORWARD_OPEN_ARROW
  }

  enum Animation {
    BOUNCE,
    DROP
  }

  enum ControlPosition {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    LEFT_BOTTOM,
    LEFT_CENTER,
    LEFT_TOP,
    RIGHT_BOTTOM,
    RIGHT_CENTER,
    RIGHT_TOP,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
  }

  enum MapTypeControlStyle {
    DEFAULT,
    DROPDOWN_MENU,
    HORIZONTAL_BAR
  }

  enum ScaleControlStyle {
    DEFAULT
  }

  interface MapTypeStyle {
    elementType?: string;
    featureType?: string;
    stylers: MapTypeStyler[];
  }

  interface MapTypeStyler {
    [key: string]: string | number | null;
  }
}
