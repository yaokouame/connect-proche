
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EntityCardProps } from "./types";
import { renderStars } from "./utils";

const EntityCard = ({ entity, isSelected, onSelect, type }: EntityCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-colors hover:border-health-blue ${isSelected ? 'border-health-blue bg-health-blue/5' : ''}`}
      onClick={() => onSelect(entity)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{entity.name}</h3>
            {type === "doctor" ? (
              <>
                <div className="text-sm text-muted-foreground">{(entity as any).specialty}</div>
                <div className="text-sm text-muted-foreground">{(entity as any).location}</div>
              </>
            ) : (
              <>
                <div className="text-sm text-muted-foreground">{(entity as any).category}</div>
                <div className="text-sm font-semibold">{(entity as any).price} F CFA</div>
              </>
            )}
          </div>
          {entity.rating && (
            <Badge className="bg-health-blue">{entity.rating}</Badge>
          )}
        </div>
        {entity.rating && (
          <div className="flex mt-2">
            {renderStars(entity.rating)}
            <span className="text-xs ml-2 text-muted-foreground">({entity.reviewCount || 0})</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EntityCard;
