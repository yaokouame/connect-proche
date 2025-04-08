
import { useState, useEffect } from "react";
import { Pharmacy, HealthCenter } from "@/types/user";
import { calculateDistance, fetchNearbyPharmacies, fetchNearbyHealthCenters } from "@/utils/mapUtils";
import { getPharmacies, getHealthCenters } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
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
          
          const abidjianLocation = { lat: 5.3599, lng: -4.0083 };
          setUserLocation(abidjianLocation);
          loadNearbyPharmacies(abidjianLocation);
          loadNearbyHealthCenters(abidjianLocation);
        }
      );
    }
    
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
      
      setPharmacies(prev => {
        const combinedList = [...nearbyPharmacies];
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
      
      setHealthCenters(prev => {
        const combinedList = [...nearbyHealthCenters];
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

  const getFilteredPharmacies = () => {
    return pharmacies.filter(pharmacy => {
      const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesInsurance = !filterByInsurance || 
        (pharmacy.acceptedInsuranceProviders && 
        pharmacy.acceptedInsuranceProviders.some(provider => 
          provider.toLowerCase().includes(filterByInsurance.toLowerCase())
        ));
      
      return matchesSearch && matchesInsurance;
    });
  };

  const getFilteredHealthCenters = () => {
    return healthCenters.filter(center => {
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
  };

  const getSortedPharmacies = () => {
    return [...getFilteredPharmacies()].sort((a, b) => {
      if (sortBy === "distance" && userLocation) {
        return calculateDistance(userLocation, a.location) - calculateDistance(userLocation, b.location);
      } else if (sortBy === "rating" && a.rating && b.rating) {
        return (b.rating || 0) - (a.rating || 0);
      } else if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

  const getSortedHealthCenters = () => {
    return [...getFilteredHealthCenters()].sort((a, b) => {
      if (sortBy === "distance" && userLocation) {
        return calculateDistance(userLocation, a.location) - calculateDistance(userLocation, b.location);
      } else if (sortBy === "rating" && a.rating && b.rating) {
        return (b.rating || 0) - (a.rating || 0);
      } else if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

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
    sortedPharmacies: getSortedPharmacies(),
    sortedHealthCenters: getSortedHealthCenters(),
  };
}
