
import { Pharmacy, HealthCenter } from "@/types/user";
import { searchNearbyPlaces, getPlaceDetails as fetchPlaceDetails } from "@/services/mapService";

// Helper function to calculate distance between two coordinates (in km)
export const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number => {
  // Haversine formula for calculating distance between two points on earth
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Format distance for display
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
};

// Function to fetch nearby pharmacies and health centers
export const fetchNearbyPlaces = async (
  location: { lat: number; lng: number },
  radius: number = 3000,
  type: 'pharmacy' | 'health' | 'both' = 'both',
  keyword?: string
): Promise<(Pharmacy | HealthCenter)[]> => {
  try {
    return await searchNearbyPlaces(location, radius, type, keyword);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return [];
  }
};

// Function to fetch nearby pharmacies only
export const fetchNearbyPharmacies = async (
  location: { lat: number; lng: number },
  radius: number = 3000,
  keyword?: string
): Promise<Pharmacy[]> => {
  try {
    const places = await searchNearbyPlaces(location, radius, 'pharmacy', keyword);
    return places as Pharmacy[];
  } catch (error) {
    console.error("Error fetching nearby pharmacies:", error);
    return [];
  }
};

// Function to fetch nearby health centers only
export const fetchNearbyHealthCenters = async (
  location: { lat: number; lng: number },
  radius: number = 3000,
  keyword?: string
): Promise<HealthCenter[]> => {
  try {
    const places = await searchNearbyPlaces(location, radius, 'health', keyword);
    return places as HealthCenter[];
  } catch (error) {
    console.error("Error fetching nearby health centers:", error);
    return [];
  }
};

// Get details for a specific place by ID
export const getPlaceDetails = async (
  placeId: string
): Promise<Pharmacy | HealthCenter | null> => {
  try {
    return await fetchPlaceDetails(placeId);
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};
