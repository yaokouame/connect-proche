
import React from "react";
import { Info } from "lucide-react";
import ConnectedDeviceCard from "./ConnectedDeviceCard";
import AddDeviceDialog from "./AddDeviceDialog";

interface DeviceManagementProps {
  devices: any[];
  loadingDevices: boolean;
  onSyncDevice: (deviceId: string) => void;
  onAddDevice: (deviceInfo: { name: string; type: string }) => Promise<void>;
}

const DeviceManagement: React.FC<DeviceManagementProps> = ({
  devices,
  loadingDevices,
  onSyncDevice,
  onAddDevice
}) => {
  return (
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
              onSync={onSyncDevice}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">
            Vous n'avez pas encore connecté d'appareils.
          </p>
          <AddDeviceDialog onAddDevice={onAddDevice} />
        </div>
      )}
    </div>
  );
};

export default DeviceManagement;
