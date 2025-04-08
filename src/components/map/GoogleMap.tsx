
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Pharmacy, HealthCenter } from "@/types/user";
import { Marker } from "@/types/map";
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
    const [markers, setMarkers] = useState<Marker[]>([]);
    
    // Create the map
    useEffect(() => {
      if (!mapRef.current || map) return;
      
      const initialLocation = userLocation || { lat: 5.3599, lng: -4.0083 }; // Default to Abidjan
      
      const newMap = new google.maps.Map(mapRef.current, {
        center: initialLocation,
        zoom: 12,
        fullscreenControl: true,
        mapTypeControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      
      setMap(newMap);
    }, [mapRef, map, userLocation]);
    
    // Add user location marker
    useEffect(() => {
      if (!map || !userLocation) return;
      
      // Center map on user location
      map.setCenter(userLocation);
      
      // Add marker for user location
      new google.maps.Marker({
        position: userLocation,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
        },
        title: "Your Location",
      });
    }, [map, userLocation]);
    
    // Add markers for places
    useEffect(() => {
      if (!map || !places.length) return;
      
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Create new markers
      const newMarkers = places.map(place => {
        const marker = new google.maps.Marker({
          position: place.location,
          map,
          animation: google.maps.Animation.DROP,
          title: place.name,
          icon: {
            url: place.type === "pharmacy" 
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
    }, [map, places, onMarkerClick]);
    
    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      centerMapOnLocation: (location: { lat: number; lng: number }) => {
        if (map) {
          map.setCenter(location);
          map.setZoom(15);
        }
      },
    }));
    
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

GoogleMap.displayName = "GoogleMap";

export default GoogleMap;
