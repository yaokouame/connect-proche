
/**
 * Service for interacting with Google Maps and Places APIs
 */

/**
 * Fetches nearby places of a specific type based on location
 * 
 * @param location User location coordinates
 * @param type Type of place ('pharmacy', 'hospital', 'health', etc.)
 * @param radius Search radius in meters
 * @returns Array of Google Places results
 */
export const fetchNearbyPlaces = (
  location: { lat: number; lng: number },
  type: string,
  radius: number = 5000
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not loaded");
      reject("Google Maps API not loaded");
      return;
    }

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: radius,
      type: type
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        resolve(results);
      } else {
        console.error(`Error fetching nearby ${type}:`, status);
        resolve([]); // Return empty array instead of rejecting to prevent UI errors
      }
    });
  });
};

/**
 * Gets details for a specific place using its place_id
 * 
 * @param placeId The Google Place ID
 * @returns Detailed place information
 */
export const getPlaceDetails = (placeId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not loaded");
      reject("Google Maps API not loaded");
      return;
    }

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      placeId: placeId,
      fields: [
        'name', 
        'formatted_address', 
        'formatted_phone_number', 
        'geometry', 
        'opening_hours', 
        'rating', 
        'website'
      ]
    };

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        resolve(place);
      } else {
        reject(`Error fetching place details: ${status}`);
      }
    });
  });
};

// Add TypeScript type declarations for Google Maps API
// We need to add this because the Google Maps types aren't included by default
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        InfoWindow: any;
        LatLng: any;
        SymbolPath: any;
        places: {
          PlacesService: any;
          PlacesServiceStatus: {
            OK: string;
          };
        };
      };
    };
  }
}
