
import React from "react";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddReadingDialog from "./AddReadingDialog";
import AddDeviceDialog from "./AddDeviceDialog";
import { VitalSign } from "@/types/health";

interface HealthTrackerHeaderProps {
  onAddReading: (reading: Omit<VitalSign, "id">) => void;
  userId: string;
  onAddDevice: (deviceInfo: { name: string; type: string }) => Promise<void>;
}

const HealthTrackerHeader: React.FC<HealthTrackerHeaderProps> = ({ 
  onAddReading, 
  userId,
  onAddDevice
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Activity className="h-7 w-7" />
        Suivi de santé
      </h1>
      <div className="flex gap-2">
        <AddReadingDialog
          onAddReading={onAddReading}
          userId={userId}
        />
        <AddDeviceDialog onAddDevice={onAddDevice} />
      </div>
    </div>
  );
};

export default HealthTrackerHeader;
