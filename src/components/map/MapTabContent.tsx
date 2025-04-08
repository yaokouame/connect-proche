
import React from 'react';
import { Pharmacy, HealthCenter } from '@/types/user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaceList from './PlaceList';

interface MapTabContentProps {
  activeTab: "pharmacies" | "centers";
  setActiveTab: (tab: "pharmacies" | "centers") => void;
  sortedPharmacies: Pharmacy[];
  sortedHealthCenters: HealthCenter[];
  loading: boolean;
  searchTerm: string;
  filterByInsurance: string | null;
  userLocation: { lat: number; lng: number } | null;
  userInsuranceProvider: string | null;
  viewOnMap: (location: { lat: number; lng: number }) => void;
}

const MapTabContent = ({
  activeTab,
  setActiveTab,
  sortedPharmacies,
  sortedHealthCenters,
  loading,
  searchTerm,
  filterByInsurance,
  userLocation,
  userInsuranceProvider,
  viewOnMap
}: MapTabContentProps) => {
  return (
    <Tabs 
      defaultValue="pharmacies" 
      className="w-full" 
      value={activeTab}
      onValueChange={(val) => setActiveTab(val as "pharmacies" | "centers")}
    >
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
        <TabsTrigger value="centers">Centres de santé</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pharmacies" className="mt-0">
        <PlaceList
          places={sortedPharmacies}
          loading={loading}
          searchTerm={searchTerm}
          filterByInsurance={filterByInsurance}
          userLocation={userLocation}
          userInsuranceProvider={userInsuranceProvider}
          viewOnMap={viewOnMap}
        />
      </TabsContent>
      
      <TabsContent value="centers" className="mt-0">
        <PlaceList
          places={sortedHealthCenters}
          loading={loading}
          searchTerm={searchTerm}
          filterByInsurance={filterByInsurance}
          userLocation={userLocation}
          userInsuranceProvider={userInsuranceProvider}
          viewOnMap={viewOnMap}
        />
      </TabsContent>
    </Tabs>
  );
};

export default MapTabContent;
