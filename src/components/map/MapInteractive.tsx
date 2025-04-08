
import React from 'react';
import { Pharmacy, HealthCenter } from '@/types/user';
import GoogleMap from './GoogleMap';
import { GoogleMapRef } from '@/types/map';
import { useLanguage } from '@/contexts/LanguageContext';

interface MapInteractiveProps {
  showMap: boolean;
  userLocation: { lat: number; lng: number } | null;
  places: (Pharmacy | HealthCenter)[];
  mapLoaded: boolean;
  mapRef: React.RefObject<HTMLDivElement>;
  googleMapRef: React.RefObject<GoogleMapRef>;
}

const MapInteractive = ({ 
  showMap, 
  userLocation, 
  places, 
  mapLoaded,
  mapRef,
  googleMapRef
}: MapInteractiveProps) => {
  const { t } = useLanguage();
  
  if (!showMap) return null;

  return (
    <div className="mb-6 rounded-lg overflow-hidden shadow-lg" ref={mapRef}>
      <GoogleMap
        ref={googleMapRef}
        userLocation={userLocation}
        places={places}
        mapLoaded={mapLoaded}
      />
    </div>
  );
};

export default MapInteractive;
