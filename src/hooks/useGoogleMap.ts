
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
  compact?: boolean;
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
  onMarkerClick,
  compact = false
}: UseGoogleMapProps): UseGoogleMapReturn => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const previousPlacesRef = useRef<(Pharmacy | HealthCenter)[]>([]);
  
  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      setGoogleMapsLoaded(true);
    };

    loadGoogleMapsApi(initMap);
    
    return () => {
      cleanupGoogleMapsCallback();
      
      // Clean up markers
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
      
      // Clean up map
      if (mapInstanceRef.current) {
        // No direct way to destroy Google Maps instance, but we can clear references
        mapInstanceRef.current = null;
      }
    };
  }, []);
  
  // Create map instance when Google Maps is loaded
  useEffect(() => {
    if (!mapRef.current || !googleMapsLoaded || mapInstanceRef.current) return;
    
    try {
      const initialLocation = userLocation || { lat: 5.3599, lng: -4.0083 }; // Default to Abidjan
      const zoomLevel = compact ? 10 : 12;
      const newMap = createGoogleMap(mapRef.current, initialLocation, zoomLevel, compact);
      mapInstanceRef.current = newMap;
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoadError("Error initializing map");
    }
  }, [mapRef, googleMapsLoaded, userLocation, compact]);
  
  // Add user location marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation || !googleMapsLoaded) return;
    
    try {
      // Center map on user location
      mapInstanceRef.current.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
      
      // Add marker for user location
      const markerSize = compact ? 24 : 32;
      addMarker(mapInstanceRef.current, userLocation, {
        title: "Your Location",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new google.maps.Size(markerSize, markerSize)
        }
      });
    } catch (error) {
      console.error("Error adding user location marker:", error);
    }
  }, [userLocation, googleMapsLoaded, compact]);
  
  // Add markers for places
  useEffect(() => {
    if (!mapInstanceRef.current || !places.length || !googleMapsLoaded) return;
    
    // Skip if places haven't changed
    if (places === previousPlacesRef.current) {
      return;
    }
    
    try {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      // Create new markers
      const newMarkers = places.map(place => {
        const marker = addMarker(
          mapInstanceRef.current!, 
          { lat: place.location.lat, lng: place.location.lng },
          {
            title: place.name,
            icon: getPlaceIcon(place, compact),
            animation: google.maps.Animation.DROP
          }
        );
        
        // Add click listener
        if (onMarkerClick) {
          marker.addListener("click", () => onMarkerClick(place));
        }
        
        return marker;
      });
      
      markersRef.current = newMarkers;
      previousPlacesRef.current = places;
    } catch (error) {
      console.error("Error adding place markers:", error);
    }
  }, [places, onMarkerClick, googleMapsLoaded, compact]);
  
  // Function to center map on a location
  const centerMapOnLocation = useCallback((location: { lat: number; lng: number }) => {
    if (mapInstanceRef.current && googleMapsLoaded) {
      mapInstanceRef.current.setCenter({ lat: location.lat, lng: location.lng });
      mapInstanceRef.current.setZoom(compact ? 13 : 15);
    }
  }, [googleMapsLoaded, compact]);
  
  return {
    mapRef,
    googleMapsLoaded,
    loadError,
    centerMapOnLocation
  };
};
