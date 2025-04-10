
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

  // Format the issue date for display
  const formattedDate = prescription.issueDate ? formatDate(prescription.issueDate) : 'Date inconnue';

  return (
    <Card 
      className={`mb-2 cursor-pointer hover:shadow-md transition-shadow ${isSelected ? 'border-health-blue border-2' : ''}`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-sm">{prescription.doctorName}</h4>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
          <div className="bg-health-teal/10 text-health-teal text-xs px-2 py-1 rounded">
            {prescription.status}
          </div>
        </div>
        
        {prescription.medications && prescription.medications.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-700">
              {prescription.medications.length} médicament(s)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrescriptionItem;
