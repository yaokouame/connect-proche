
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import {
  getUserVitalSigns,
  getUserConnectedDevices,
  addVitalSignReading,
  connectDevice
} from "@/services/healthService";
import { VitalSign } from "@/types/health";

export const useHealthTracker = () => {
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

  return {
    currentUser,
    vitalSigns,
    loadingVitalSigns,
    devices,
    loadingDevices,
    activeTab,
    setActiveTab,
    handleAddReading,
    handleAddDevice,
    handleSyncDevice
  };
};
