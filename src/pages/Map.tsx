
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
import { Search, MapPin, Phone, Clock } from "lucide-react";
import Layout from "@/components/Layout";

const Map = () => {
  const [activeTab, setActiveTab] = useState<"pharmacies" | "centers">("pharmacies");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);

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
  }, []);

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

          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Trier par distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="rating">Évaluation</SelectItem>
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
            ) : filteredPharmacies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPharmacies.map((pharmacy) => (
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
            ) : filteredHealthCenters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHealthCenters.map((center) => (
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
