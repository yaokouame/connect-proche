
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Doctor, Product } from "./types";
import { renderStars } from "./utils";

interface EntityDetailsProps {
  entity: Doctor | Product;
  onAddReview: () => void;
}

const EntityDetails = ({ entity, onAddReview }: EntityDetailsProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-xl">{entity.name}</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onAddReview}
        >
          <PlusCircle className="h-4 w-4" />
          Ajouter un avis
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-xl font-bold text-health-blue">
              {entity.rating || "-"}
              <span className="text-sm font-normal text-muted-foreground ml-1">/5</span>
            </div>
            <div className="flex">
              {renderStars(entity.rating || 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              Basé sur {entity.reviewCount || 0} avis
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EntityDetails;
