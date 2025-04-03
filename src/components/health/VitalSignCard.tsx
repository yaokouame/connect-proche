
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VitalSign } from "@/types/health";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  Heart, 
  Droplet, 
  Thermometer, 
  Activity, 
  Scale, 
  Lungs 
} from "lucide-react";

interface VitalSignCardProps {
  title: string;
  type: VitalSign['type'];
  latestReading: VitalSign;
}

const VitalSignCard: React.FC<VitalSignCardProps> = ({ 
  title, 
  type, 
  latestReading 
}) => {
  // Get the icon based on vital sign type
  const getVitalSignIcon = () => {
    switch(type) {
      case 'blood_pressure':
        return <Activity className="h-5 w-5" />;
      case 'heart_rate':
        return <Heart className="h-5 w-5" />;
      case 'blood_sugar':
        return <Droplet className="h-5 w-5" />;
      case 'temperature':
        return <Thermometer className="h-5 w-5" />;
      case 'weight':
        return <Scale className="h-5 w-5" />;
      case 'oxygen':
        return <Lungs className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  // Format the timestamp
  const getTimeAgo = () => {
    try {
      return formatDistanceToNow(new Date(latestReading.timestamp), { 
        addSuffix: true, 
        locale: fr 
      });
    } catch (error) {
      return 'Date inconnue';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center gap-2">
            {getVitalSignIcon()}
            <span>{title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {latestReading.value} <span className="text-sm font-normal text-muted-foreground">{latestReading.unit}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {getTimeAgo()}
        </div>
        {latestReading.notes && (
          <div className="mt-2 text-xs bg-muted p-2 rounded-md">
            {latestReading.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VitalSignCard;
