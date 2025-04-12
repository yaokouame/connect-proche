
import React, { useRef, useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const MapInteractive = () => {
  const mapRef = useRef<GoogleMapRefHandle>(null);
  const [selectedPlace, setSelectedPlace] = useState<Pharmacy | HealthCenter | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isSmallScreen = useMediaQuery("(max-width: 639px)");
  const { t } = useLanguage();
  
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

  // Ajustement dynamique de la hauteur de la carte pour les petits écrans
  const [mapHeight, setMapHeight] = useState("h-[calc(100vh-300px)]");
  
  useEffect(() => {
    const updateMapHeight = () => {
      if (isSmallScreen) {
        setMapHeight("h-[350px]");
      } else if (isTablet) {
        setMapHeight("h-[450px]");
      } else {
        setMapHeight("h-[calc(100vh-300px)]");
      }
    };
    
    updateMapHeight();
    window.addEventListener('resize', updateMapHeight);
    return () => window.removeEventListener('resize', updateMapHeight);
  }, [isSmallScreen, isTablet]);
  
  return (
    <div className="flex flex-col gap-4 px-2 sm:px-4">
      {/* Awareness and Ad Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AwarenessBanner className="h-full w-full" />
        <AdBanner className="h-full w-full" />
      </div>
      
      <div className={`grid grid-cols-1 ${isTablet ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-4 md:gap-6 ${mapHeight} min-h-[350px]`}>
        {/* Map Container */}
        <div className={`${isTablet ? '' : 'lg:col-span-2'} h-full flex flex-col order-2 ${isMobile ? 'order-1' : 'lg:order-1'}`}>
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
                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-10 scale-75 sm:scale-100 origin-bottom-right">
                  <VisitorCounter />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar with Filters and Results */}
        <div className={`flex flex-col h-full order-1 ${isMobile ? 'order-2' : 'lg:order-2'}`}>
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
              
              <Tabs defaultValue="results" className="w-full">
                <TabsList className="w-full mb-2 sm:mb-4">
                  <TabsTrigger value="results" className="flex-1 text-xs sm:text-sm">{t('map.pharmaciesTab')}</TabsTrigger>
                  <TabsTrigger value="selected" className="flex-1 text-xs sm:text-sm">{t('map.centersTab')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="results" className="m-0">
                  <div className="flex-1 overflow-auto pr-1 custom-scrollbar max-h-[250px] sm:max-h-[300px] lg:max-h-[calc(100vh-450px)]">
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
                </TabsContent>
                
                <TabsContent value="selected" className="m-0">
                  {selectedPlace ? (
                    <div className="flex-1 overflow-auto pr-1 custom-scrollbar max-h-[250px] sm:max-h-[300px] lg:max-h-[calc(100vh-450px)]">
                      <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-2">Selected Location</h3>
                      <PlaceCard 
                        place={selectedPlace} 
                        userLocation={userLocation}
                        userInsuranceProvider={userInsuranceProvider}
                        viewOnMap={viewOnMap}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-40 text-gray-500 text-sm sm:text-base">
                      Select a location on the map
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapInteractive;
