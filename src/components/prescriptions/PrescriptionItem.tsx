
import React from "react";
import { Prescription } from "@/types/user";
import { formatDate } from "@/utils/dateUtils";
import { Card, CardContent } from "@/components/ui/card";

export interface PrescriptionItemProps {
  prescription: Prescription;
  onSelect?: (prescription: Prescription) => void;
  isSelected?: boolean;
}

const PrescriptionItem: React.FC<PrescriptionItemProps> = ({ 
  prescription, 
  onSelect,
  isSelected = false
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(prescription);
    }
  };

  // Format the issue date for display using the date property
  const formattedDate = prescription.date ? formatDate(prescription.date) : 'Date inconnue';

  return (
    <Card 
      className={`mb-3 cursor-pointer hover:shadow-md transition-all ${isSelected ? 'border-health-blue border-2' : 'hover:translate-y-[-2px]'}`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-sm">{prescription.professionalName}</h4>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${
            prescription.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : prescription.status === 'expired'
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-health-teal/10 text-health-teal'
          }`}>
            {prescription.status}
          </div>
        </div>
        
        {prescription.medications && prescription.medications.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-700 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-health-blue mr-1.5"></span>
              {prescription.medications.length} médicament(s)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrescriptionItem;
