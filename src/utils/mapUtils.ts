
import { fetchNearbyPlaces, getPlaceDetails } from "@/services/mapService";
import { Pharmacy, HealthCenter } from "@/types/user";

/**
 * Calculates distance between two coordinates using the Haversine formula
 * 
 * @param point1 First location coordinates
 * @param point2 Second location coordinates
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  point1: { lat: number; lng: number } | null,
  point2: { lat: number; lng: number }
): number => {
  if (!point1) return Infinity;
  
  // Calculate the distance using the Haversine formula
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(point2.lat - point1.lat);
  const dLng = deg2rad(point2.lng - point1.lng);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
};

/**
 * Converts degrees to radians
 */
export const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

/**
 * Formats distance for display
 * 
 * @param distance Distance in kilometers
 * @returns Formatted distance string (e.g., "500 m" or "2.5 km")
 */
export const formatDistance = (distance: number): string => {
  return distance < 1 ? 
    `${(distance * 1000).toFixed(0)} m` : 
    `${distance.toFixed(1)} km`;
};

/**
 * Fetches nearby pharmacies from Google Places API
 * 
 * @param location User location coordinates
 * @returns Array of pharmacies
 */
export const fetchNearbyPharmacies = async (
  location: { lat: number; lng: number }
): Promise<Pharmacy[]> => {
  try {
    const places = await fetchNearbyPlaces(location, 'pharmacy', 5000);
    
    // Convert Google Places results to our app's Pharmacy format
    return places.map((place: any, index: number): Pharmacy => ({
      id: `place-pharm-${index}`,
      name: place.name,
      address: place.vicinity,
      phone: place.phone || "Non disponible",
      hours: place.opening_hours?.weekday_text?.join(', ') || "Horaires non disponibles",
      location: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      },
      acceptedInsuranceProviders: [],
      rating: place.rating,
      placeId: place.place_id
    }));
  } catch (error) {
    console.error("Error fetching nearby pharmacies:", error);
    return [];
  }
};

/**
 * Fetches nearby health centers from Google Places API
 * 
 * @param location User location coordinates
 * @returns Array of health centers
 */
export const fetchNearbyHealthCenters = async (
  location: { lat: number; lng: number }
): Promise<HealthCenter[]> => {
  try {
    // Fetch both hospitals and health (clinics) establishments
    const hospitals = await fetchNearbyPlaces(location, 'hospital', 5000);
    const healthClinics = await fetchNearbyPlaces(location, 'health', 5000);
    
    // Combine and deduplicate by place_id
    const combinedPlaces = [...hospitals];
    healthClinics.forEach(clinic => {
      if (!combinedPlaces.some(h => h.place_id === clinic.place_id)) {
        combinedPlaces.push(clinic);
      }
    });
    
    // Convert Google Places results to our app's HealthCenter format
    return combinedPlaces.map((place: any, index: number): HealthCenter => ({
      id: `place-center-${index}`,
      name: place.name,
      type: place.types?.includes('hospital') ? 'Hôpital' : 'Centre de santé',
      services: [],
      address: place.vicinity,
      phone: place.phone || "Non disponible",
      hours: place.opening_hours?.weekday_text?.join(', ') || "Horaires non disponibles",
      location: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      },
      acceptedInsuranceProviders: [],
      rating: place.rating,
      placeId: place.place_id
    }));
  } catch (error) {
    console.error("Error fetching nearby health centers:", error);
    return [];
  }
};
