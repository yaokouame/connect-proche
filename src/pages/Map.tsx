
import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Pharmacy, HealthCenter } from "@/types/user";
import { getPharmacies, getHealthCenters } from "@/services/dataService";
import { Map as MapIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import GoogleMap from "@/components/map/GoogleMap";
import MapFilters from "@/components/map/MapFilters";
import PlaceList from "@/components/map/PlaceList";
import { GoogleMapRef } from "@/types/map";
import { calculateDistance, fetchNearbyPharmacies, fetchNearbyHealthCenters } from "@/utils/mapUtils";

const Map = () => {
  const [activeTab, setActiveTab] = useState<"pharmacies" | "centers">("pharmacies");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "alphabetical">("distance");
  const [filterByInsurance, setFilterByInsurance] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<GoogleMapRef>(null);
  const { t } = useLanguage();
  const { toast } = useToast();
  const { currentUser } = useUser();
  const patientUser = currentUser?.role === "patient" ? currentUser : null;

  useEffect(() => {
    // Try to get user's location first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          // Initialize search for nearby places once we have location
          if (location) {
            loadNearbyPharmacies(location);
            loadNearbyHealthCenters(location);
          }
          
          toast({
            title: "Localisation activée",
            description: "Les établissements sont maintenant triés par proximité.",
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            variant: "destructive",
            title: "Localisation non disponible",
            description: "Impossible d'accéder à votre position. Vérifiez vos paramètres de confidentialité.",
          });
          
          // Set a default location (Abidjan)
          const abidjianLocation = { lat: 5.3599, lng: -4.0083 };
          setUserLocation(abidjianLocation);
          loadNearbyPharmacies(abidjianLocation);
          loadNearbyHealthCenters(abidjianLocation);
        }
      );
    }
    
    // Also load the backup data from our mock service
    const fetchData = async () => {
      try {
        const pharmaciesData = await getPharmacies();
        setPharmacies(pharmaciesData);
        
        const centersData = await getHealthCenters();
        setHealthCenters(centersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    };
    
    loadGoogleMapsScript();
  }, [toast]);

  const loadNearbyPharmacies = async (location: {lat: number, lng: number}) => {
    setLoading(true);
    try {
      const nearbyPharmacies = await fetchNearbyPharmacies(location);
      
      // Combine Google Places results with our existing data
      setPharmacies(prev => {
        const combinedList = [...nearbyPharmacies];
        // Add our existing pharmacies that aren't duplicates
        prev.forEach(pharmacy => {
          if (!nearbyPharmacies.some(p => p.name === pharmacy.name)) {
            combinedList.push(pharmacy);
          }
        });
        return combinedList;
      });
    } catch (error) {
      console.error("Error loading nearby pharmacies:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadNearbyHealthCenters = async (location: {lat: number, lng: number}) => {
    setLoading(true);
    try {
      const nearbyHealthCenters = await fetchNearbyHealthCenters(location);
      
      // Combine Google Places results with our existing data
      setHealthCenters(prev => {
        const combinedList = [...nearbyHealthCenters];
        // Add our existing health centers that aren't duplicates
        prev.forEach(center => {
          if (!nearbyHealthCenters.some(c => c.name === center.name)) {
            combinedList.push(center);
          }
        });
        return combinedList;
      });
    } catch (error) {
      console.error("Error loading nearby health centers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter pharmacies by search term and insurance provider
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInsurance = !filterByInsurance || 
      (pharmacy.acceptedInsuranceProviders && 
       pharmacy.acceptedInsuranceProviders.some(provider => 
         provider.toLowerCase().includes(filterByInsurance.toLowerCase())
       ));
    
    return matchesSearch && matchesInsurance;
  });

  // Filter health centers by search term and insurance provider
  const filteredHealthCenters = healthCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesInsurance = !filterByInsurance || 
      (center.acceptedInsuranceProviders && 
       center.acceptedInsuranceProviders.some(provider => 
         provider.toLowerCase().includes(filterByInsurance.toLowerCase())
       ));
    
    return matchesSearch && matchesInsurance;
  });

  const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
    if (sortBy === "distance" && userLocation) {
      return calculateDistance(userLocation, a.location) - calculateDistance(userLocation, b.location);
    } else if (sortBy === "rating" && a.rating && b.rating) {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const sortedHealthCenters = [...filteredHealthCenters].sort((a, b) => {
    if (sortBy === "distance" && userLocation) {
      return calculateDistance(userLocation, a.location) - calculateDistance(userLocation, b.location);
    } else if (sortBy === "rating" && a.rating && b.rating) {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Get the user's insurance provider if available
  const userInsuranceProvider = patientUser?.insuranceInfo?.provider || null;

  const viewOnMap = (location: {lat: number, lng: number}) => {
    setShowMap(true);
    
    // Wait for map to be initialized
    setTimeout(() => {
      if (googleMapRef.current) {
        googleMapRef.current.centerMapOnLocation(location);
      }
    }, 100);
    
    // Scroll to map
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
        
        {showMap && (
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg" ref={mapRef}>
            <GoogleMap
              ref={googleMapRef}
              userLocation={userLocation}
              places={activeTab === "pharmacies" ? sortedPharmacies : sortedHealthCenters}
              mapLoaded={mapLoaded}
            />
          </div>
        )}
        
        <Tabs defaultValue="pharmacies" className="w-full" onValueChange={(val) => setActiveTab(val as "pharmacies" | "centers")}>
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

        {!showMap && (
          <div className="mt-12 text-center">
            <Button 
              onClick={() => setShowMap(true)}
              className="flex items-center mx-auto"
            >
              <MapIcon className="h-4 w-4 mr-2" />
              Afficher la carte interactive
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Map;
