
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VitalSignsChart from "./VitalSignsChart";

interface HealthTrendsProps {
  vitalSigns: any;
}

const HealthTrends: React.FC<HealthTrendsProps> = ({ vitalSigns }) => {
  return (
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
  );
};

export default HealthTrends;
