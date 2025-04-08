
import React, { useState, useEffect } from "react";
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
    setActiveTab,
    getLocation
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

  const handleUseMyLocation = () => {
    getLocation();
    toast({
      title: t("map.updatingLocation"),
      description: t("map.findingYourLocation"),
    });
  };

  return (
    <Layout>
      <div className="container py-4 space-y-4">
        <Card className="bg-gradient-to-r from-health-blue/10 to-white border-none shadow-md">
          <CardHeader className="py-3">
            <CardTitle className="text-health-blue text-xl">{t('map.locationSearch')}</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder={t('map.searchPlaceholder')}
                    className="pl-9 py-4 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  className="flex-shrink-0 bg-health-blue hover:bg-health-teal"
                  onClick={handleUseMyLocation}
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
          viewOnMap={() => {}}
        />
      </div>
    </Layout>
  );
};

export default Map;
