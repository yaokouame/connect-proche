
import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyOverviewProps {
  onNavigateToDevices: () => void;
}

const EmptyOverview: React.FC<EmptyOverviewProps> = ({ onNavigateToDevices }) => {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">
        Aucune donnée de santé disponible.
      </p>
      <Button className="mt-4" onClick={onNavigateToDevices}>
        Connecter un appareil
      </Button>
    </div>
  );
};

export default EmptyOverview;
