
import { useState, useEffect, useRef, useCallback } from 'react';
import { Pharmacy, HealthCenter } from '@/types/user';
import { 
  loadGoogleMapsApi, 
  cleanupGoogleMapsCallback, 
  createGoogleMap,
  addMarker,
  getPlaceIcon
} from '@/utils/googleMapsUtils';

interface UseGoogleMapProps {
  userLocation: { lat: number; lng: number } | null;
  places: (Pharmacy | HealthCenter)[];
  onMarkerClick?: (place: Pharmacy | HealthCenter) => void;
}

interface UseGoogleMapReturn {
  mapRef: React.RefObject<HTMLDivElement>;
  googleMapsLoaded: boolean;
  loadError: string | null;
  centerMapOnLocation: (location: { lat: number; lng: number }) => void;
}

export const useGoogleMap = ({
  userLocation,
  places,
  onMarkerClick
}: UseGoogleMapProps): UseGoogleMapReturn => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      setGoogleMapsLoaded(true);
    };

    loadGoogleMapsApi(initMap);
    
    return cleanupGoogleMapsCallback;
  }, []);
  
  // Create map instance when Google Maps is loaded
  useEffect(() => {
    if (!mapRef.current || !googleMapsLoaded || map) return;
    
    try {
      const initialLocation = userLocation || { lat: 5.3599, lng: -4.0083 }; // Default to Abidjan
      const newMap = createGoogleMap(mapRef.current, initialLocation);
      setMap(newMap);
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoadError("Error initializing map");
    }
  }, [mapRef, googleMapsLoaded, map, userLocation]);
  
  // Add user location marker
  useEffect(() => {
    if (!map || !userLocation || !googleMapsLoaded) return;
    
    try {
      // Center map on user location
      map.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
      
      // Add marker for user location
      addMarker(map, userLocation, {
        title: "Your Location",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new google.maps.Size(32, 32)
        }
      });
    } catch (error) {
      console.error("Error adding user location marker:", error);
    }
  }, [map, userLocation, googleMapsLoaded]);
  
  // Add markers for places
  useEffect(() => {
    if (!map || !places.length || !googleMapsLoaded) return;
    
    try {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Create new markers
      const newMarkers = places.map(place => {
        const marker = addMarker(
          map, 
          { lat: place.location.lat, lng: place.location.lng },
          {
            title: place.name,
            icon: getPlaceIcon(place),
            animation: google.maps.Animation.DROP
          }
        );
        
        // Add click listener
        if (onMarkerClick) {
          marker.addListener("click", () => onMarkerClick(place));
        }
        
        return marker;
      });
      
      setMarkers(newMarkers);
    } catch (error) {
      console.error("Error adding place markers:", error);
    }
  }, [map, places, onMarkerClick, googleMapsLoaded, markers]);
  
  // Function to center map on a location
  const centerMapOnLocation = useCallback((location: { lat: number; lng: number }) => {
    if (map && googleMapsLoaded) {
      map.setCenter({ lat: location.lat, lng: location.lng });
      map.setZoom(15);
    }
  }, [map, googleMapsLoaded]);
  
  return {
    mapRef,
    googleMapsLoaded,
    loadError,
    centerMapOnLocation
  };
};
