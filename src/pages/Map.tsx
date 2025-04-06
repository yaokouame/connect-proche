
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Pharmacy, HealthCenter } from "@/types/user";
import { getPharmacies, getHealthCenters } from "@/services/dataService";
import { Search, MapPin, Phone, Clock, Navigation, BadgeCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Map = () => {
  const [activeTab, setActiveTab] = useState<"pharmacies" | "centers">("pharmacies");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "alphabetical">("distance");
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
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
    
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
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
        }
      );
    }
  }, [toast]);

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

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHealthCenters = healthCenters.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.services.some(service => 
      service.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
    if (sortBy === "distance" && userLocation) {
      return calculateDistance(a.location) - calculateDistance(b.location);
    } else if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const sortedHealthCenters = [...filteredHealthCenters].sort((a, b) => {
    if (sortBy === "distance" && userLocation) {
      return calculateDistance(a.location) - calculateDistance(b.location);
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

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Trier par..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="alphabetical">Alphabétique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
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
                      {userLocation && (
                        <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
                          <Navigation className="h-4 w-4 mr-1" />
                          {getDistanceText(pharmacy.location)}
                        </div>
                      )}
                      <Button size="sm">Voir sur la carte</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucune pharmacie trouvée pour "{searchTerm}"</p>
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
                      
                      {userLocation && (
                        <div className="flex items-center text-sm text-blue-600 font-medium mb-4">
                          <Navigation className="h-4 w-4 mr-1" />
                          {getDistanceText(center.location)}
                        </div>
                      )}
                      
                      <div className="mt-2 mb-4">
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
                      
                      <Button size="sm">Voir sur la carte</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun centre de santé trouvé pour "{searchTerm}"</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-gray-200 rounded-lg p-4 text-center">
          <p className="text-gray-600">
            Carte interactive à venir dans une prochaine version.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Map;
