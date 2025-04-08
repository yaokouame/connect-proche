import React, { useRef, useState } from "react";
import GoogleMap, { GoogleMapRefHandle } from "./GoogleMap";
import MapFilters from "./MapFilters";
import PlaceList from "./PlaceList";
import PlaceCard from "./PlaceCard";
import { Pharmacy, HealthCenter } from "@/types/user";
import { useMap } from "@/hooks/useMap";
import AdBanner from "../ads/AdBanner";
import AwarenessBanner from "../ads/AwarenessBanner";
import VisitorCounter from "../analytics/VisitorCounter";

const MapInteractive = () => {
  const mapRef = useRef<GoogleMapRefHandle>(null);
  const [selectedPlace, setSelectedPlace] = useState<Pharmacy | HealthCenter | null>(null);
  
  const {
    userLocation,
    sortedPharmacies,
    sortedHealthCenters,
    loading,
    searchTerm,
    filterByInsurance,
    setFilterByInsurance,
    activeTab,
    setSortBy,
    userInsuranceProvider
  } = useMap();
  
  // Get places based on the active tab
  const places = activeTab === "pharmacies" ? sortedPharmacies : sortedHealthCenters;
  
  const handleMarkerClick = (place: Pharmacy | HealthCenter) => {
    setSelectedPlace(place);
  };
  
  const viewOnMap = (location: { lat: number; lng: number }) => {
    if (mapRef.current) {
      mapRef.current.centerMapOnLocation(location);
    }
  };
  
  const handlePlaceCardClick = (place: Pharmacy | HealthCenter) => {
    setSelectedPlace(place);
    if (mapRef.current && place.location) {
      mapRef.current.centerMapOnLocation(place.location);
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      {/* Awareness Banner */}
      <AwarenessBanner className="mb-2" />
      
      {/* Ad Banner */}
      <AdBanner className="mb-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
        <div className="md:col-span-2 h-full">
          <GoogleMap
            ref={mapRef}
            userLocation={userLocation}
            places={places}
            onMarkerClick={handleMarkerClick}
          />
          
          {/* Visitor Counter - positioned on the map */}
          <div className="relative">
            <div className="absolute bottom-4 right-4 z-10">
              <VisitorCounter />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <MapFilters
            filterByInsurance={filterByInsurance}
            setFilterByInsurance={setFilterByInsurance}
            userInsuranceProvider={userInsuranceProvider}
            searchTerm={searchTerm}
            setSearchTerm={() => {}} // This is a placeholder, we'll fix the proper implementation
            sortBy="distance"
            setSortBy={setSortBy}
          />
          <div className="flex-1 overflow-auto mt-4">
            <PlaceList 
              places={places} 
              loading={loading}
              searchTerm={searchTerm}
              filterByInsurance={filterByInsurance}
              userLocation={userLocation}
              userInsuranceProvider={userInsuranceProvider}
              viewOnMap={viewOnMap}
            />
          </div>
          {selectedPlace && (
            <div className="mt-4">
              <PlaceCard 
                place={selectedPlace} 
                userLocation={userLocation}
                userInsuranceProvider={userInsuranceProvider}
                viewOnMap={viewOnMap}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapInteractive;
