
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MedicalRecordListProps {
  title: string;
  items: string[];
  onAddItem: (item: string) => void;
  onRemoveItem: (index: number) => void;
  placeholder: string;
}

const MedicalRecordList = ({
  title,
  items,
  onAddItem,
  onRemoveItem,
  placeholder
}: MedicalRecordListProps) => {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      onAddItem(newItem.trim());
      setNewItem("");
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="space-y-2">
        {items.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{item}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveItem(index)} 
                  className="h-8 px-2 text-red-500 hover:text-red-700"
                >
                  Supprimer
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">Aucun élément enregistré</p>
        )}
        
        <div className="flex mt-2">
          <Input
            placeholder={placeholder}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="mr-2"
          />
          <Button 
            type="button" 
            onClick={handleAddItem}
            variant="outline"
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordList;
