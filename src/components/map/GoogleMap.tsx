
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Pharmacy, HealthCenter } from "@/types/user";
import { Info } from "lucide-react";

interface GoogleMapProps {
  userLocation: { lat: number; lng: number } | null;
  places: (Pharmacy | HealthCenter)[];
  onMarkerClick?: (place: Pharmacy | HealthCenter) => void;
  className?: string;
}

export interface GoogleMapRefHandle {
  centerMapOnLocation: (location: { lat: number; lng: number }) => void;
}

const GoogleMap = forwardRef<GoogleMapRefHandle, GoogleMapProps>(
  ({ userLocation, places, onMarkerClick, className = "w-full h-full" }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    
    // Check if Google Maps is loaded
    useEffect(() => {
      const checkGoogleMapsLoaded = () => {
        if (window.google && window.google.maps) {
          setGoogleMapsLoaded(true);
        } else {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places&callback=initMap`;
          script.async = true;
          script.defer = true;
          
          // Add global callback function
          window.initMap = () => {
            setGoogleMapsLoaded(true);
          };
          
          script.onerror = () => {
            setLoadError("Failed to load Google Maps API");
          };
          
          document.head.appendChild(script);
        }
      };
      
      checkGoogleMapsLoaded();
      
      return () => {
        // Clean up global callback
        if (window.initMap) {
          delete window.initMap;
        }
      };
    }, []);
    
    // Create the map
    useEffect(() => {
      if (!mapRef.current || !googleMapsLoaded || map) return;
      
      try {
        const initialLocation = userLocation || { lat: 5.3599, lng: -4.0083 }; // Default to Abidjan
        
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: initialLocation.lat, lng: initialLocation.lng },
          zoom: 12,
          fullscreenControl: true,
          mapTypeControl: true,
          streetViewControl: false,
          mapTypeId: "roadmap",
        });
        
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
        new google.maps.Marker({
          position: { lat: userLocation.lat, lng: userLocation.lng },
          map,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new google.maps.Size(32, 32)
          },
          title: "Your Location",
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
          const isPharmacy = 'type' in place && place.type === "pharmacy";
          
          const marker = new google.maps.Marker({
            position: { lat: place.location.lat, lng: place.location.lng },
            map,
            animation: google.maps.Animation.DROP,
            title: place.name,
            icon: {
              url: isPharmacy
                ? "/images/pharmacy-marker.png" 
                : "/images/hospital-marker.png",
              scaledSize: new google.maps.Size(32, 32),
            },
          });
          
          // Add click listener
          marker.addListener("click", () => {
            if (onMarkerClick) onMarkerClick(place);
          });
          
          return marker;
        });
        
        setMarkers(newMarkers);
      } catch (error) {
        console.error("Error adding place markers:", error);
      }
    }, [map, places, onMarkerClick, googleMapsLoaded]);
    
    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      centerMapOnLocation: (location: { lat: number; lng: number }) => {
        if (map && googleMapsLoaded) {
          map.setCenter({ lat: location.lat, lng: location.lng });
          map.setZoom(15);
        }
      },
    }));
    
    // Show loading state
    if (!googleMapsLoaded) {
      return (
        <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
          <div className="text-center p-4">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading map...</p>
          </div>
        </div>
      );
    }
    
    // Show error if map failed to load
    if (loadError) {
      return (
        <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
          <div className="text-center p-4 text-red-500">
            <p>{loadError}</p>
            <p className="text-sm mt-2">Please check your internet connection or try again later.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className={`relative ${className}`}>
        <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden"></div>
        
        {!userLocation && (
          <div className="absolute top-4 left-4 right-4 bg-white p-3 rounded-md shadow-md flex items-start">
            <Info className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Location services are disabled. Enable location for better results.
            </p>
          </div>
        )}
      </div>
    );
  }
);

// Add this for TypeScript
declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

GoogleMap.displayName = "GoogleMap";

export default GoogleMap;
