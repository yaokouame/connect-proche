
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
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMediaQuery } from "@/hooks/use-media-query";

const MapInteractive = () => {
  const mapRef = useRef<GoogleMapRefHandle>(null);
  const [selectedPlace, setSelectedPlace] = useState<Pharmacy | HealthCenter | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  
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
      {/* Awareness and Ad Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AwarenessBanner className="h-full" />
        <AdBanner className="h-full" />
      </div>
      
      <div className={`grid grid-cols-1 ${isTablet ? 'sm:grid-cols-2' : 'md:grid-cols-3'} gap-4 md:gap-6 h-[calc(100vh-300px)] min-h-[500px]`}>
        {/* Map Container */}
        <div className={`${isTablet ? '' : 'md:col-span-2'} h-full flex flex-col`}>
          <Card className="h-full border-none shadow-md overflow-hidden">
            <CardContent className="p-0 h-full">
              <GoogleMap
                ref={mapRef}
                userLocation={userLocation}
                places={places}
                onMarkerClick={handleMarkerClick}
                height="h-full"
                compact={isMobile || isTablet}
              />
              
              {/* Visitor Counter - positioned on the map */}
              <div className="relative">
                <div className="absolute bottom-4 right-4 z-10">
                  <VisitorCounter />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar with Filters and Results */}
        <div className="flex flex-col h-full">
          <Card className="h-full overflow-hidden">
            <CardContent className="p-2 sm:p-4 flex flex-col h-full">
              <div className="mb-2 sm:mb-4">
                <MapFilters
                  filterByInsurance={filterByInsurance}
                  setFilterByInsurance={setFilterByInsurance}
                  userInsuranceProvider={userInsuranceProvider}
                  searchTerm={searchTerm}
                  setSearchTerm={() => {}} // This is a placeholder, we'll fix the proper implementation
                  sortBy="distance"
                  setSortBy={setSortBy}
                />
              </div>
              
              <div className="flex-1 overflow-auto pr-1 custom-scrollbar">
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
                <div className="mt-2 sm:mt-4 border-t pt-2 sm:pt-4">
                  <h3 className="text-base sm:text-lg font-medium mb-2">Selected Location</h3>
                  <PlaceCard 
                    place={selectedPlace} 
                    userLocation={userLocation}
                    userInsuranceProvider={userInsuranceProvider}
                    viewOnMap={viewOnMap}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapInteractive;
