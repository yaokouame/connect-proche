import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import MapToggle from "@/components/map/MapToggle";
import MapFilters from "@/components/map/MapFilters";
import MapInteractive from "@/components/map/MapInteractive";
import MapTabContent from "@/components/map/MapTabContent";
import { useMap } from "@/hooks/useMap";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pharmacy, HealthCenter, PatientProfile } from "@/types/user";
import { GoogleMapRef } from "@/types/map";
import EmergencyButton from "@/components/emergency/EmergencyButton";

const Map = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByInsurance, setFilterByInsurance] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pharmacies" | "centers">("pharmacies");
  const [showMap, setShowMap] = useState(true);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<GoogleMapRef>(null);
  
  // Get user insurance provider if available (from patient profile)
  const userInsuranceProvider = currentUser?.role === 'patient' 
    ? (currentUser as PatientProfile)?.insuranceInfo?.provider || null 
    : null;
  
  const {
    userLocation,
    nearbyPharmacies,
    nearbyHealthCenters,
    loading,
    error,
    mapLoaded,
    getLocation,
    searchNearby,
  } = useMap();

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: t("map.locationError"),
        description: error,
      });
    }
  }, [error, toast, t]);

  useEffect(() => {
    searchNearby(searchTerm);
  }, [searchTerm, searchNearby]);

  const filterPlacesByInsurance = (
    places: (Pharmacy | HealthCenter)[],
    insurance: string | null
  ): (Pharmacy | HealthCenter)[] => {
    if (!insurance) return places;
    return places.filter(place =>
      place.acceptedInsuranceProviders && place.acceptedInsuranceProviders.includes(insurance)
    );
  };

  const sortPlacesByName = (places: (Pharmacy | HealthCenter)[]): (Pharmacy | HealthCenter)[] => {
    return [...places].sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredPharmacies = filterPlacesByInsurance(nearbyPharmacies, filterByInsurance);
  const filteredHealthCenters = filterPlacesByInsurance(nearbyHealthCenters, filterByInsurance);

  const sortedPharmacies = sortPlacesByName(filteredPharmacies);
  const sortedHealthCenters = sortPlacesByName(filteredHealthCenters);

  const viewOnMap = (location: { lat: number; lng: number }) => {
    googleMapRef.current?.centerMapOnLocation(location);
  };

  return (
    <Layout>
      <div className="container py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('map.locationSearch')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder={t('map.searchPlaceholder')}
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  className="flex-shrink-0" 
                  onClick={getLocation}
                >
                  <MapPin className="mr-2 h-4 w-4" /> {t('map.useMyLocation')}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <MapToggle showMap={showMap} setShowMap={setShowMap} />
                <MapFilters 
                  filterByInsurance={filterByInsurance}
                  setFilterByInsurance={setFilterByInsurance}
                  userInsuranceProvider={userInsuranceProvider}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <MapInteractive 
          showMap={showMap}
          userLocation={userLocation}
          places={activeTab === "pharmacies" ? sortedPharmacies : sortedHealthCenters}
          mapLoaded={mapLoaded}
          mapRef={mapRef}
          googleMapRef={googleMapRef}
        />
        
        <MapTabContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sortedPharmacies={sortedPharmacies}
          sortedHealthCenters={sortedHealthCenters}
          loading={loading}
          searchTerm={searchTerm}
          filterByInsurance={filterByInsurance}
          userLocation={userLocation}
          userInsuranceProvider={userInsuranceProvider}
          viewOnMap={viewOnMap}
        />
      </div>
      
      <EmergencyButton />
    </Layout>
  );
};

export default Map;
