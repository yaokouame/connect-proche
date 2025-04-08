
import { Pharmacy, HealthCenter } from "@/types/user";
import { searchNearbyPlaces } from "@/services/mapService";

export const fetchNearbyPlaces = async (
  lat: number,
  lng: number,
  radius: number = 3000,
  type: 'pharmacy' | 'health' | 'both' = 'both',
  keyword?: string
): Promise<(Pharmacy | HealthCenter)[]> => {
  try {
    const location = { lat, lng };
    return await searchNearbyPlaces(location, radius, type, keyword);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return [];
  }
};
