
import React from "react";
import { FileText, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Prescription } from "@/types/user";

interface PrescriptionItemProps {
  prescription: Prescription;
  isSelected: boolean;
  onSelect: (prescription: Prescription) => void;
}

const PrescriptionItem: React.FC<PrescriptionItemProps> = ({
  prescription,
  isSelected,
  onSelect,
}) => {
  return (
    <div 
      className={`border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors
                ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={() => onSelect(prescription)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Dr. {prescription.professionalName}</p>
            <p className="text-xs text-gray-500">
              Expire le {prescription.expiryDate}
            </p>
          </div>
        </div>
        {prescription.prescriptionImage?.verified && (
          <Badge className="bg-green-500">
            <Check className="w-3 h-3 mr-1" />
            Vérifié
          </Badge>
        )}
      </div>
    </div>
  );
};

export default PrescriptionItem;
