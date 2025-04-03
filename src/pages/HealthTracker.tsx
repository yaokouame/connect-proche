
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";
import VitalSignsChart from "@/components/health/VitalSignsChart";
import VitalSignCard from "@/components/health/VitalSignCard";
import ConnectedDeviceCard from "@/components/health/ConnectedDeviceCard";
import AddReadingDialog from "@/components/health/AddReadingDialog";
import AddDeviceDialog from "@/components/health/AddDeviceDialog";
import {
  getUserVitalSigns,
  getUserConnectedDevices,
  addVitalSignReading,
  connectDevice
} from "@/services/healthService";
import { VitalSign } from "@/types/health";
import { Activity, ChevronRight, Info } from "lucide-react";

const HealthTracker = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch vital signs data
  const { data: vitalSigns, isLoading: loadingVitalSigns } = useQuery({
    queryKey: ["vitalSigns", currentUser?.id],
    queryFn: () => getUserVitalSigns(currentUser?.id || ""),
    enabled: !!currentUser,
  });
  
  // Fetch connected devices
  const { data: devices = [], isLoading: loadingDevices } = useQuery({
    queryKey: ["connectedDevices", currentUser?.id],
    queryFn: () => getUserConnectedDevices(currentUser?.id || ""),
    enabled: !!currentUser,
  });
  
  // Mutation for adding new readings
  const addReadingMutation = useMutation({
    mutationFn: addVitalSignReading,
    onSuccess: (newReading) => {
      // Update the vital signs data with the new reading
      queryClient.setQueryData(
        ["vitalSigns", currentUser?.id],
        (oldData: any) => {
          if (!oldData) return oldData;
          
          const newData = { ...oldData };
          switch (newReading.type) {
            case "blood_pressure":
              newData.bloodPressure = [newReading, ...oldData.bloodPressure];
              break;
            case "heart_rate":
              newData.heartRate = [newReading, ...oldData.heartRate];
              break;
            case "blood_sugar":
              newData.bloodSugar = [newReading, ...oldData.bloodSugar];
              break;
            case "weight":
              newData.weight = [newReading, ...oldData.weight];
              break;
            case "temperature":
              newData.temperature = [newReading, ...oldData.temperature];
              break;
            case "oxygen":
              newData.oxygen = [newReading, ...oldData.oxygen];
              break;
          }
          return newData;
        }
      );
      
      toast({
        title: "Mesure ajoutée",
        description: "Votre nouvelle mesure a été enregistrée.",
      });
    },
  });
  
  // Mutation for connecting new devices
  const connectDeviceMutation = useMutation({
    mutationFn: connectDevice,
    onSuccess: (newDevice) => {
      // Update the devices list
      queryClient.setQueryData(
        ["connectedDevices", currentUser?.id],
        (oldData: any = []) => {
          return [...oldData, newDevice];
        }
      );
    },
  });
  
  // Handle adding a new reading
  const handleAddReading = (reading: Omit<VitalSign, "id">) => {
    addReadingMutation.mutate(reading);
  };
  
  // Handle connecting a new device
  const handleAddDevice = async (deviceInfo: { name: string; type: string }) => {
    await connectDeviceMutation.mutateAsync(deviceInfo);
  };
  
  // Handle syncing a device
  const handleSyncDevice = (deviceId: string) => {
    toast({
      title: "Synchronisation en cours",
      description: "Veuillez patienter pendant la synchronisation de l'appareil...",
    });
    
    // Simulating sync process
    setTimeout(() => {
      toast({
        title: "Synchronisation terminée",
        description: "Les données de l'appareil ont été mises à jour.",
      });
    }, 2000);
  };
  
  if (!currentUser) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Connectez-vous pour accéder à votre suivi santé</h1>
          <p className="mb-8 text-gray-600">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button>Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">S'inscrire</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Activity className="h-7 w-7" />
            Suivi de santé
          </h1>
          <div className="flex gap-2">
            <AddReadingDialog
              onAddReading={handleAddReading}
              userId={currentUser.id}
            />
            <AddDeviceDialog onAddDevice={handleAddDevice} />
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-6">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
            <TabsTrigger value="devices">Appareils</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {loadingVitalSigns ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
              </div>
            ) : vitalSigns ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <VitalSignCard
                    title="Pression artérielle"
                    type="blood_pressure"
                    latestReading={vitalSigns.bloodPressure[vitalSigns.bloodPressure.length - 1]}
                  />
                  <VitalSignCard
                    title="Rythme cardiaque"
                    type="heart_rate"
                    latestReading={vitalSigns.heartRate[vitalSigns.heartRate.length - 1]}
                  />
                  <VitalSignCard
                    title="Glycémie"
                    type="blood_sugar"
                    latestReading={vitalSigns.bloodSugar[vitalSigns.bloodSugar.length - 1]}
                  />
                  <VitalSignCard
                    title="Poids"
                    type="weight"
                    latestReading={vitalSigns.weight[vitalSigns.weight.length - 1]}
                  />
                  <VitalSignCard
                    title="Température"
                    type="temperature"
                    latestReading={vitalSigns.temperature[vitalSigns.temperature.length - 1]}
                  />
                  <VitalSignCard
                    title="Oxygène sanguin"
                    type="oxygen"
                    latestReading={vitalSigns.oxygen[vitalSigns.oxygen.length - 1]}
                  />
                </div>
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rythme cardiaque récent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <VitalSignsChart
                        data={vitalSigns.heartRate.slice(-14)} // Last 14 days
                        title="Rythme cardiaque"
                        color="#ef4444"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={() => setActiveTab("trends")}
                  >
                    Voir toutes les tendances
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Aucune donnée de santé disponible.
                </p>
                <Button className="mt-4" onClick={() => setActiveTab("devices")}>
                  Connecter un appareil
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trends">
            {vitalSigns ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pression artérielle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <VitalSignsChart
                        data={vitalSigns.bloodPressure}
                        title="Pression systolique"
                        color="#3b82f6"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rythme cardiaque</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <VitalSignsChart
                        data={vitalSigns.heartRate}
                        title="Rythme cardiaque"
                        color="#ef4444"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Glycémie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <VitalSignsChart
                        data={vitalSigns.bloodSugar}
                        title="Glycémie"
                        color="#8b5cf6"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Poids</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <VitalSignsChart
                        data={vitalSigns.weight}
                        title="Poids"
                        color="#10b981"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Aucune donnée disponible pour afficher les tendances.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="devices">
            <div className="mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Connectez des appareils pour automatiser la collecte de vos données de santé. 
                    Les données sont synchronisées automatiquement avec votre profil.
                  </p>
                </div>
              </div>
              
              {loadingDevices ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
                </div>
              ) : devices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {devices.map((device) => (
                    <ConnectedDeviceCard
                      key={device.id}
                      device={device}
                      onSync={handleSyncDevice}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <p className="text-muted-foreground mb-4">
                    Vous n'avez pas encore connecté d'appareils.
                  </p>
                  <AddDeviceDialog onAddDevice={handleAddDevice} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HealthTracker;
