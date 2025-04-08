
import React, { forwardRef, useImperativeHandle } from "react";
import { Pharmacy, HealthCenter } from "@/types/user";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import MapLoading from "./MapLoading";
import MapError from "./MapError";
import LocationAlert from "./LocationAlert";

interface GoogleMapProps {
  userLocation: { lat: number; lng: number } | null;
  places: (Pharmacy | HealthCenter)[];
  onMarkerClick?: (place: Pharmacy | HealthCenter) => void;
  className?: string;
  height?: string;
  compact?: boolean;
}

export interface GoogleMapRefHandle {
  centerMapOnLocation: (location: { lat: number; lng: number }) => void;
}

const GoogleMap = forwardRef<GoogleMapRefHandle, GoogleMapProps>(
  ({ 
    userLocation, 
    places, 
    onMarkerClick, 
    className = "w-full", 
    height = "h-full", 
    compact = false 
  }, ref) => {
    const {
      mapRef,
      googleMapsLoaded,
      loadError,
      centerMapOnLocation
    } = useGoogleMap({
      userLocation,
      places,
      onMarkerClick,
      compact
    });
    
    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      centerMapOnLocation
    }));
    
    // Show loading state
    if (!googleMapsLoaded) {
      return <MapLoading className={`${className} ${height}`} />;
    }
    
    // Show error if map failed to load
    if (loadError) {
      return <MapError error={loadError} className={`${className} ${height}`} />;
    }
    
    return (
      <div className={`relative ${className} ${height} ${compact ? 'rounded-md' : 'rounded-lg'} overflow-hidden ${compact ? 'shadow-md' : 'shadow-lg'} border border-gray-200`}>
        <div ref={mapRef} className="w-full h-full"></div>
        
        {!userLocation && <LocationAlert />}
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
