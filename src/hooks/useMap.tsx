
import { useState, useEffect, useCallback } from "react";
import { Pharmacy, HealthCenter } from "@/types/user";
import { calculateDistance } from "@/utils/mapUtils";
import { getPharmacies, getHealthCenters } from "@/services/pharmacyService";
import { useToast } from "@/components/ui/use-toast";

export function useMap() {
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
  const [error, setError] = useState<string | null>(null);
  const [userInsuranceProvider, setUserInsuranceProvider] = useState<string | null>(null);
  const { toast } = useToast();

  // Get location function
  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          toast({
            title: "Location enabled",
            description: "Nearby establishments will be sorted by proximity.",
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Unable to access your location. Please check your privacy settings.");
          
          toast({
            variant: "destructive",
            title: "Location unavailable",
            description: "Unable to access your location. Please check your privacy settings.",
          });
          
          // Default to Abidjan location
          const abidjianLocation = { lat: 5.3599, lng: -4.0083 };
          setUserLocation(abidjianLocation);
        }
      );
    }
  }, [toast]);

  // Search nearby function
  const searchNearby = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    // Get user location on component mount
    getLocation();
    
    // Fetch data
    const fetchData = async () => {
      try {
        setLoading(true);
        const pharmaciesData = await getPharmacies();
        setPharmacies(pharmaciesData);
        
        const centersData = await getHealthCenters();
        setHealthCenters(centersData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch nearby establishments.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // We'll let the GoogleMap component handle Maps API loading
    setMapLoaded(true);
  }, [getLocation]);

  const getFilteredPharmacies = useCallback(() => {
    return pharmacies.filter(pharmacy => {
      const matchesSearch = searchTerm ? 
        pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      
      const matchesInsurance = !filterByInsurance || 
        (pharmacy.acceptedInsuranceProviders && 
        pharmacy.acceptedInsuranceProviders.some(provider => 
          provider.toLowerCase().includes(filterByInsurance.toLowerCase())
        ));
      
      return matchesSearch && matchesInsurance;
    });
  }, [pharmacies, searchTerm, filterByInsurance]);

  const getFilteredHealthCenters = useCallback(() => {
    return healthCenters.filter(center => {
      const matchesSearch = searchTerm ?
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      
      const matchesInsurance = !filterByInsurance || 
        (center.acceptedInsuranceProviders && 
        center.acceptedInsuranceProviders.some(provider => 
          provider.toLowerCase().includes(filterByInsurance.toLowerCase())
        ));
      
      return matchesSearch && matchesInsurance;
    });
  }, [healthCenters, searchTerm, filterByInsurance]);

  const getSortedPharmacies = useCallback(() => {
    return [...getFilteredPharmacies()].sort((a, b) => {
      if (sortBy === "distance" && userLocation) {
        return calculateDistance(userLocation, a.location) - calculateDistance(userLocation, b.location);
      } else if (sortBy === "rating") {
        return ((b.rating || 0) - (a.rating || 0));
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }, [getFilteredPharmacies, sortBy, userLocation]);

  const getSortedHealthCenters = useCallback(() => {
    return [...getFilteredHealthCenters()].sort((a, b) => {
      if (sortBy === "distance" && userLocation) {
        return calculateDistance(userLocation, a.location) - calculateDistance(userLocation, b.location);
      } else if (sortBy === "rating") {
        return ((b.rating || 0) - (a.rating || 0));
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }, [getFilteredHealthCenters, sortBy, userLocation]);

  return {
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
    error,
    getLocation,
    searchNearby,
    sortedPharmacies: getSortedPharmacies(),
    sortedHealthCenters: getSortedHealthCenters(),
    userInsuranceProvider,
    setUserInsuranceProvider
  };
}
