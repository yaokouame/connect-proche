
import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import MapInteractive from "@/components/map/MapInteractive";
import MapTabContent from "@/components/map/MapTabContent";
import { useMap } from "@/hooks/useMap";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { PatientProfile } from "@/types/user";
import EmergencyButton from "@/components/emergency/EmergencyButton";

const Map = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const userInsuranceProvider = currentUser?.role === 'patient' 
    ? (currentUser as PatientProfile)?.insuranceInfo?.provider || null 
    : null;
  
  const {
    userLocation,
    loading,
    error,
    mapLoaded,
    sortedPharmacies,
    sortedHealthCenters,
    setSearchTerm: setMapSearchTerm,
    setFilterByInsurance,
    setSortBy,
    activeTab,
    setActiveTab
  } = useMap();

  useEffect(() => {
    setMapSearchTerm(searchTerm);
  }, [searchTerm, setMapSearchTerm]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: t("map.locationError"),
        description: error,
      });
    }
  }, [error, toast, t]);

  const viewOnMap = (location: { lat: number; lng: number }) => {
    // This will be handled in the MapInteractive component
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
                >
                  <MapPin className="mr-2 h-4 w-4" /> {t('map.useMyLocation')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <MapInteractive />
        
        <MapTabContent 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sortedPharmacies={sortedPharmacies}
          sortedHealthCenters={sortedHealthCenters}
          loading={loading}
          searchTerm={searchTerm}
          filterByInsurance={null}
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
