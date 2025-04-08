
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pharmacy, HealthCenter } from "@/types/user";
import { getPharmacies, getHealthCenters } from "@/services/dataService";
import { Search, MapPin, Phone, Clock, Navigation, BadgeCheck, Wallet, ShieldCheck, Map as MapIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { fetchNearbyPlaces } from "@/services/mapService";

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
  const [nearbyPharmacies, setNearbyPharmacies] = useState<any[]>([]);
  const [nearbyHealthCenters, setNearbyHealthCenters] = useState<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
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
            fetchNearbyPharmacies(location);
            fetchNearbyHealthCenters(location);
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
          fetchNearbyPharmacies(abidjianLocation);
          fetchNearbyHealthCenters(abidjianLocation);
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
    
    return () => {
      // Clean up markers when component unmounts
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [toast]);

  const fetchNearbyPharmacies = async (location: {lat: number, lng: number}) => {
    setLoading(true);
    try {
      const places = await fetchNearbyPlaces(location, 'pharmacy', 5000);
      setNearbyPharmacies(places);
      
      // Convert Google Places results to our app's Pharmacy format
      const formattedPharmacies = places.map((place: any, index: number): Pharmacy => ({
        id: `place-pharm-${index}`,
        name: place.name,
        address: place.vicinity,
        phone: place.phone || "Non disponible",
        hours: place.opening_hours?.weekday_text?.join(', ') || "Horaires non disponibles",
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        acceptedInsuranceProviders: [],
        rating: place.rating,
        placeId: place.place_id
      }));
      
      // Combine Google Places results with our existing data
      setPharmacies(prev => {
        const combinedList = [...formattedPharmacies];
        // Add our existing pharmacies that aren't duplicates
        prev.forEach(pharmacy => {
          if (!formattedPharmacies.some(p => p.name === pharmacy.name)) {
            combinedList.push(pharmacy);
          }
        });
        return combinedList;
      });
    } catch (error) {
      console.error("Error fetching nearby pharmacies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyHealthCenters = async (location: {lat: number, lng: number}) => {
    setLoading(true);
    try {
      // Fetch both hospitals and health (clinics) establishments
      const hospitals = await fetchNearbyPlaces(location, 'hospital', 5000);
      const healthClinics = await fetchNearbyPlaces(location, 'health', 5000);
      
      // Combine and deduplicate by place_id
      const combinedPlaces = [...hospitals];
      healthClinics.forEach(clinic => {
        if (!combinedPlaces.some(h => h.place_id === clinic.place_id)) {
          combinedPlaces.push(clinic);
        }
      });
      
      setNearbyHealthCenters(combinedPlaces);
      
      // Convert Google Places results to our app's HealthCenter format
      const formattedCenters = combinedPlaces.map((place: any, index: number): HealthCenter => ({
        id: `place-center-${index}`,
        name: place.name,
        type: place.types?.includes('hospital') ? 'Hôpital' : 'Centre de santé',
        services: [],
        address: place.vicinity,
        phone: place.phone || "Non disponible",
        hours: place.opening_hours?.weekday_text?.join(', ') || "Horaires non disponibles",
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        acceptedInsuranceProviders: [],
        rating: place.rating,
        placeId: place.place_id
      }));
      
      // Combine Google Places results with our existing data
      setHealthCenters(prev => {
        const combinedList = [...formattedCenters];
        // Add our existing health centers that aren't duplicates
        prev.forEach(center => {
          if (!formattedCenters.some(c => c.name === center.name)) {
            combinedList.push(center);
          }
        });
        return combinedList;
      });
    } catch (error) {
      console.error("Error fetching nearby health centers:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || !userLocation || !mapLoaded) return;
    
    // Initialize the map
    googleMapRef.current = new google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 14,
      mapTypeControl: false,
    });
    
    // Add a marker for the user's location
    new google.maps.Marker({
      position: userLocation,
      map: googleMapRef.current,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      },
      title: "Votre position",
    });
    
    // Add markers for pharmacies or health centers based on the active tab
    if (activeTab === "pharmacies") {
      addMarkersToMap(pharmacies);
    } else {
      addMarkersToMap(healthCenters);
    }
  };

  const addMarkersToMap = (places: Pharmacy[] | HealthCenter[]) => {
    if (!googleMapRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Create an info window to share between markers
    const infoWindow = new google.maps.InfoWindow();
    
    // Add markers for all places
    places.forEach((place) => {
      const marker = new google.maps.Marker({
        position: place.location,
        map: googleMapRef.current,
        title: place.name,
        animation: google.maps.Animation.DROP,
      });
      
      // Create info window content
      const contentString = `
        <div class="p-2">
          <h3 class="font-bold">${place.name}</h3>
          <p class="text-sm">${place.address}</p>
          <p class="text-sm">${place.phone}</p>
        </div>
      `;
      
      // Add click listener to open info window
      marker.addListener("click", () => {
        infoWindow.setContent(contentString);
        infoWindow.open(googleMapRef.current, marker);
      });
      
      // Store marker reference for cleanup
      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (showMap && mapLoaded) {
      initializeMap();
    }
  }, [showMap, mapLoaded, activeTab, userLocation, pharmacies, healthCenters]);

  useEffect(() => {
    if (googleMapRef.current) {
      if (activeTab === "pharmacies") {
        addMarkersToMap(pharmacies);
      } else {
        addMarkersToMap(healthCenters);
      }
    }
  }, [activeTab]);

  const calculateDistance = (location: {lat: number, lng: number}) => {
    if (!userLocation) return Infinity;
    
    // Calculate the distance using the Haversine formula
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(location.lat - userLocation.lat);
    const dLng = deg2rad(location.lng - userLocation.lng);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(userLocation.lat)) * Math.cos(deg2rad(location.lat)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; // Distance in km
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
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
      return calculateDistance(a.location) - calculateDistance(b.location);
    } else if (sortBy === "rating" && a.rating && b.rating) {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const sortedHealthCenters = [...filteredHealthCenters].sort((a, b) => {
    if (sortBy === "distance" && userLocation) {
      return calculateDistance(a.location) - calculateDistance(b.location);
    } else if (sortBy === "rating" && a.rating && b.rating) {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
  
  const getDistanceText = (location: {lat: number, lng: number}) => {
    if (!userLocation) return "";
    const distance = calculateDistance(location);
    return distance < 1 ? 
      `${(distance * 1000).toFixed(0)} m` : 
      `${distance.toFixed(1)} km`;
  };

  // Get the user's insurance provider if available
  const userInsuranceProvider = patientUser?.insuranceInfo?.provider || null;

  const viewOnMap = (location: {lat: number, lng: number}) => {
    setShowMap(true);
    
    // Wait for map to be initialized
    setTimeout(() => {
      if (googleMapRef.current) {
        googleMapRef.current.setCenter(location);
        googleMapRef.current.setZoom(16);
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
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher par nom, adresse ou service..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Trier par..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Évaluation</SelectItem>
                <SelectItem value="alphabetical">Alphabétique</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filterByInsurance || "all"} 
              onValueChange={(value) => setFilterByInsurance(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filtrer par assurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les assurances</SelectItem>
                <SelectItem value="MUGEFCI">MUGEFCI</SelectItem>
                <SelectItem value="CNPS">CNPS</SelectItem>
                <SelectItem value="CMU">CMU</SelectItem>
                <SelectItem value="IPS-CGRAE">IPS-CGRAE</SelectItem>
                <SelectItem value="SUNU">SUNU Assurances</SelectItem>
                {userInsuranceProvider && (
                  <SelectItem value={userInsuranceProvider}>
                    {userInsuranceProvider} (Votre assurance)
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {patientUser?.insuranceInfo && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <div className="text-sm">
              <span className="font-medium">Votre assurance: </span>
              <span>{patientUser.insuranceInfo.provider}</span>
              {filterByInsurance !== patientUser.insuranceInfo.provider && (
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm ml-2"
                  onClick={() => setFilterByInsurance(patientUser.insuranceInfo?.provider || null)}
                >
                  Voir les établissements compatibles
                </Button>
              )}
            </div>
          </div>
        )}
        
        {showMap && (
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
            <div 
              ref={mapRef} 
              className="w-full h-[400px]"
            >
              {!mapLoaded && (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <p>Chargement de la carte...</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <Tabs defaultValue="pharmacies" className="w-full" onValueChange={(val) => setActiveTab(val as "pharmacies" | "centers")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="centers">Centres de santé</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pharmacies" className="mt-0">
            {loading ? (
              <div className="text-center py-8">
                <p>Chargement des pharmacies...</p>
              </div>
            ) : sortedPharmacies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedPharmacies.map((pharmacy) => (
                  <Card key={pharmacy.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle>{pharmacy.name}</CardTitle>
                      <CardDescription className="flex items-start">
                        <MapPin className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                        {pharmacy.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Phone className="h-4 w-4 mr-1" />
                        {pharmacy.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        {pharmacy.hours}
                      </div>
                      {pharmacy.rating && (
                        <div className="flex items-center text-sm text-yellow-600 font-medium mb-4">
                          {"⭐".repeat(Math.min(Math.round(pharmacy.rating), 5))} 
                          <span className="ml-1">({pharmacy.rating.toFixed(1)})</span>
                        </div>
                      )}
                      {userLocation && (
                        <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
                          <Navigation className="h-4 w-4 mr-1" />
                          {getDistanceText(pharmacy.location)}
                        </div>
                      )}
                      
                      {pharmacy.acceptedInsuranceProviders && pharmacy.acceptedInsuranceProviders.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium flex items-center mb-2">
                            <Wallet className="h-4 w-4 mr-1 text-gray-500" />
                            Assurances acceptées:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {pharmacy.acceptedInsuranceProviders.map((provider, idx) => {
                              const isUserInsurance = provider === userInsuranceProvider;
                              return (
                                <Badge 
                                  key={idx} 
                                  className={isUserInsurance ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                                >
                                  {provider}
                                  {isUserInsurance && (
                                    <BadgeCheck className="h-3 w-3 ml-1 text-green-600" />
                                  )}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        size="sm" 
                        onClick={() => viewOnMap(pharmacy.location)}
                        className="flex items-center"
                      >
                        <MapIcon className="h-4 w-4 mr-2" />
                        Voir sur la carte
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {filterByInsurance
                    ? `Aucune pharmacie trouvée pour "${searchTerm}" acceptant l'assurance ${filterByInsurance}`
                    : `Aucune pharmacie trouvée pour "${searchTerm}"`
                  }
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="centers" className="mt-0">
            {loading ? (
              <div className="text-center py-8">
                <p>Chargement des centres de santé...</p>
              </div>
            ) : sortedHealthCenters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedHealthCenters.map((center) => (
                  <Card key={center.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle>{center.name}</CardTitle>
                      <CardDescription className="flex items-start">
                        <MapPin className="h-4 w-4 mr-1 mt-1 flex-shrink-0" />
                        {center.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Phone className="h-4 w-4 mr-1" />
                        {center.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        {center.hours}
                      </div>
                      
                      {center.rating && (
                        <div className="flex items-center text-sm text-yellow-600 font-medium mb-4">
                          {"⭐".repeat(Math.min(Math.round(center.rating), 5))} 
                          <span className="ml-1">({center.rating.toFixed(1)})</span>
                        </div>
                      )}
                      
                      {userLocation && (
                        <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
                          <Navigation className="h-4 w-4 mr-1" />
                          {getDistanceText(center.location)}
                        </div>
                      )}
                      
                      {center.services && center.services.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Services:</p>
                          <div className="flex flex-wrap gap-1">
                            {center.services.map((service, idx) => (
                              <span 
                                key={idx} 
                                className="text-xs bg-health-blue/10 text-health-blue px-2 py-1 rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {center.acceptedInsuranceProviders && center.acceptedInsuranceProviders.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium flex items-center mb-2">
                            <Wallet className="h-4 w-4 mr-1 text-gray-500" />
                            Assurances acceptées:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {center.acceptedInsuranceProviders.map((provider, idx) => {
                              const isUserInsurance = provider === userInsuranceProvider;
                              return (
                                <Badge 
                                  key={idx} 
                                  className={isUserInsurance ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                                >
                                  {provider}
                                  {isUserInsurance && (
                                    <BadgeCheck className="h-3 w-3 ml-1 text-green-600" />
                                  )}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        size="sm" 
                        onClick={() => viewOnMap(center.location)}
                        className="flex items-center"
                      >
                        <MapIcon className="h-4 w-4 mr-2" />
                        Voir sur la carte
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {filterByInsurance
                    ? `Aucun centre de santé trouvé pour "${searchTerm}" acceptant l'assurance ${filterByInsurance}`
                    : `Aucun centre de santé trouvé pour "${searchTerm}"`
                  }
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {!showMap && (
          <div className="mt-12 text-center">
            <Button 
              onClick={() => {
                setShowMap(true);
                setTimeout(initializeMap, 100);
              }}
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
