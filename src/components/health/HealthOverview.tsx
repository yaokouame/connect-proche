
import React from "react";
import { Activity } from "lucide-react";
import VitalSignCard from "./VitalSignCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VitalSignsChart from "./VitalSignsChart";
import { ChevronRight } from "lucide-react";

interface HealthOverviewProps {
  vitalSigns: any;
  onViewAllTrends: () => void;
}

const HealthOverview: React.FC<HealthOverviewProps> = ({ 
  vitalSigns,
  onViewAllTrends
}) => {
  return (
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
          onClick={onViewAllTrends}
        >
          Voir toutes les tendances
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default HealthOverview;
