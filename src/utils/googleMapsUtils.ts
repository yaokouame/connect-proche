
// Helper functions for Google Maps integration

// Use Vite's import.meta.env instead of process.env
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY';

// Load Google Maps API script
export const loadGoogleMapsApi = (callback: () => void): void => {
  // Check if Google Maps is already loaded
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  // Create script element
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
  script.async = true;
  script.defer = true;
  
  // Add global callback function
  window.initMap = callback;
  
  // Handle script load error
  script.onerror = () => {
    console.error("Failed to load Google Maps API");
  };
  
  // Append script to document
  document.head.appendChild(script);
};

// Clean up global callback
export const cleanupGoogleMapsCallback = (): void => {
  if (window.initMap) {
    delete window.initMap;
  }
};

// Create a map instance
export const createGoogleMap = (
  mapElement: HTMLElement, 
  center: google.maps.LatLngLiteral,
  zoom: number = 12,
  compact: boolean = false
): google.maps.Map => {
  return new google.maps.Map(mapElement, {
    center,
    zoom,
    fullscreenControl: !compact,
    mapTypeControl: !compact,
    streetViewControl: false,
    mapTypeId: "roadmap",
    zoomControl: true,
    // Removed the gestureHandling property that was causing the error
    disableDefaultUI: compact,
    styles: compact ? [
      { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
    ] : undefined
  });
};

// Add a marker to the map
export const addMarker = (
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  options: {
    title?: string,
    icon?: string | google.maps.Icon,
    animation?: typeof google.maps.Animation[keyof typeof google.maps.Animation],
  } = {}
): google.maps.Marker => {
  return new google.maps.Marker({
    position,
    map,
    title: options.title,
    icon: options.icon,
    animation: options.animation,
  });
};

// Get icon for a place based on its type
export const getPlaceIcon = (place: { type?: string } | any, compact: boolean = false): google.maps.Icon => {
  const isPharmacy = 'type' in place && place.type === "pharmacy";
  const size = compact ? 24 : 32;
  
  return {
    url: isPharmacy
      ? "/images/pharmacy-marker.png" 
      : "/images/hospital-marker.png",
    scaledSize: new google.maps.Size(size, size),
  };
};
