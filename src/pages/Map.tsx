
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { GoogleMapRef } from "@/types/map";
import { useMap } from "@/hooks/useMap";
import MapFilters from "@/components/map/MapFilters";
import MapTabContent from "@/components/map/MapTabContent";
import MapInteractive from "@/components/map/MapInteractive";
import MapToggle from "@/components/map/MapToggle";

const Map = () => {
  const {
    activeTab,
    setActiveTab,
    loading,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterByInsurance,
    setFilterByInsurance,
    userLocation,
    showMap,
    setShowMap,
    mapLoaded,
    sortedPharmacies,
    sortedHealthCenters,
  } = useMap();
  
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<GoogleMapRef>(null);
  const { currentUser } = useUser();
  const patientUser = currentUser?.role === "patient" ? currentUser : null;
  const userInsuranceProvider = patientUser?.insuranceInfo?.provider || null;

  const viewOnMap = (location: {lat: number, lng: number}) => {
    setShowMap(true);
    
    setTimeout(() => {
      if (googleMapRef.current) {
        googleMapRef.current.centerMapOnLocation(location);
      }
    }, 100);
    
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-health-dark">
          Trouvez des établissements de santé à proximité
        </h1>
        
        <MapFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterByInsurance={filterByInsurance}
          setFilterByInsurance={setFilterByInsurance}
          userInsuranceProvider={userInsuranceProvider}
        />
        
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

        <MapToggle 
          showMap={showMap}
          setShowMap={setShowMap}
        />
      </div>
    </Layout>
  );
};

export default Map;
