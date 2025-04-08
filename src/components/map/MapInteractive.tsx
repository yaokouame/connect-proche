
import React, { useRef, useState, useEffect } from "react";
import GoogleMap, { GoogleMapRefHandle } from "./GoogleMap";
import MapFilters from "./MapFilters";
import PlaceList from "./PlaceList";
import PlaceCard from "./PlaceCard";
import { Pharmacy, HealthCenter } from "@/types/user";
import { useMap } from "@/hooks/useMap";

const MapInteractive = () => {
  const mapRef = useRef<GoogleMapRefHandle>(null);
  const [selectedPlace, setSelectedPlace] = useState<Pharmacy | HealthCenter | null>(null);
  
  const {
    userLocation,
    places,
    loading,
    filterOptions,
    applyFilters,
    clearFilters
  } = useMap();
  
  const handleMarkerClick = (place: Pharmacy | HealthCenter) => {
    setSelectedPlace(place);
  };
  
  const handlePlaceCardClick = (place: Pharmacy | HealthCenter) => {
    setSelectedPlace(place);
    if (mapRef.current && place.location) {
      mapRef.current.centerMapOnLocation(place.location);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
      <div className="md:col-span-2 h-full">
        <GoogleMap
          ref={mapRef}
          userLocation={userLocation}
          places={places}
          onMarkerClick={handleMarkerClick}
        />
      </div>
      <div className="flex flex-col h-full">
        <MapFilters
          options={filterOptions}
          onApplyFilters={applyFilters}
          onClearFilters={clearFilters}
        />
        <div className="flex-1 overflow-auto mt-4">
          <PlaceList 
            places={places} 
            selectedPlace={selectedPlace}
            onPlaceClick={handlePlaceCardClick}
            loading={loading}
          />
        </div>
        {selectedPlace && (
          <div className="mt-4">
            <PlaceCard place={selectedPlace} detailed />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapInteractive;
