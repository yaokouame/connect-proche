
import React from "react";
import EntityCard from "./EntityCard";
import { Doctor, Product } from "./types";

interface EntityListProps {
  entities: (Doctor | Product)[];
  selectedEntity: Doctor | Product | null;
  onSelectEntity: (entity: Doctor | Product) => void;
  entityType: "doctor" | "product";
}

const EntityList = ({ entities, selectedEntity, onSelectEntity, entityType }: EntityListProps) => {
  return (
    <div>
      <h2 className="font-semibold mb-4 text-lg">
        {entityType === "product" ? "Produits" : "Médecins"}
      </h2>
      <div className="space-y-3">
        {entities.map((entity) => (
          <EntityCard
            key={entity.id}
            entity={entity}
            isSelected={selectedEntity?.id === entity.id}
            onSelect={onSelectEntity}
            type={entityType}
          />
        ))}
      </div>
    </div>
  );
};

export default EntityList;
