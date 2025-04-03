
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConnectedDevice } from "@/types/health";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Smartphone, Watch, Activity, RefreshCw } from "lucide-react";

interface ConnectedDeviceCardProps {
  device: ConnectedDevice;
  onSync: (deviceId: string) => void;
}

const ConnectedDeviceCard: React.FC<ConnectedDeviceCardProps> = ({ 
  device, 
  onSync 
}) => {
  // Get the icon based on device type
  const getDeviceIcon = () => {
    switch(device.type) {
      case 'smartwatch':
        return <Watch className="h-5 w-5" />;
      case 'blood_pressure_monitor':
      case 'glucose_monitor':
        return <Activity className="h-5 w-5" />;
      default:
        return <Smartphone className="h-5 w-5" />;
    }
  };

  // Get the status color
  const getStatusColor = () => {
    switch(device.status) {
      case 'connected':
        return 'bg-green-500 text-white';
      case 'disconnected':
        return 'bg-red-500 text-white';
      case 'pairing':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Format the last sync time
  const getLastSyncTime = () => {
    try {
      return formatDistanceToNow(new Date(device.lastSync), { 
        addSuffix: true, 
        locale: fr 
      });
    } catch (error) {
      return 'Date inconnue';
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center gap-2">
            {getDeviceIcon()}
            <span>{device.name}</span>
          </div>
        </CardTitle>
        <Badge className={getStatusColor()}>
          {device.status === 'connected' ? 'Connecté' : 
           device.status === 'disconnected' ? 'Déconnecté' : 'Jumelage en cours'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Dernière synchronisation: {getLastSyncTime()}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 flex items-center gap-2"
          onClick={() => onSync(device.id)}
          disabled={device.status === 'disconnected'}
        >
          <RefreshCw className="h-4 w-4" />
          Synchroniser
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectedDeviceCard;
