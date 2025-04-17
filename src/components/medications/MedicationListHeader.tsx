
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Plus } from "lucide-react";

interface MedicationListHeaderProps {
  onAddClick: () => void;
}

const MedicationListHeader = ({ onAddClick }: MedicationListHeaderProps) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle className="flex items-center">
          <Pill className="mr-2 h-5 w-5 text-health-blue" />
          Mes Médicaments
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            onClick={onAddClick}
            variant="outline" 
            size="sm" 
            className="h-9"
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default MedicationListHeader;
