import React from "react";
import { Prescription } from "@/types/user";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, User, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

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
  // Helper function to get medication images
  const getMedicationImage = (medicationName: string): string => {
    const medicationImages: Record<string, string> = {
      "Amoxicilline": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      "Doliprane": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "Ventoline": "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      "Advil": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "Augmentin": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      "Smecta": "https://images.unsplash.com/photo-1501286353178-1ec871214838",
      "Imodium": "https://images.unsplash.com/photo-1501286353178-1ec871214838",
      "Aspirine": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    };
    
    // Try to find an exact match first
    if (medicationImages[medicationName]) {
      return medicationImages[medicationName];
    }
    
    // Otherwise, try to find a partial match
    for (const [key, url] of Object.entries(medicationImages)) {
      if (medicationName.toLowerCase().includes(key.toLowerCase())) {
        return url;
      }
    }
    
    // Default image if no match is found
    return "https://images.unsplash.com/photo-1582562124811-c09040d0a901";
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-colors ${
        isSelected ? "border-2 border-health-blue bg-blue-50" : "hover:bg-gray-50"
      }`}
      onClick={() => onSelect(prescription)}
    >
      <CardContent className="flex items-start p-4">
        <div className="mr-4 flex-shrink-0">
          <div className="bg-gray-100 p-2 rounded-md">
            <FileText className="h-8 w-8 text-health-blue" />
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm">Dr. {prescription.professionalName}</h4>
              <div className="flex items-center text-gray-500 text-xs mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>
                  {formatDate(prescription.date)}
                  {new Date(prescription.date) > new Date() ? 
                    ` (dans ${formatDistanceToNow(new Date(prescription.date), { locale: fr })})` : 
                    ` (il y a ${formatDistanceToNow(new Date(prescription.date), { locale: fr })})`}
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          
          {prescription.medications.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Médicaments :</p>
              <div className="flex flex-wrap gap-2">
                {prescription.medications.map((med, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                    <div className="h-4 w-4 rounded-full overflow-hidden mr-1">
                      <img 
                        src={getMedicationImage(med.name)} 
                        alt={med.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-xs">{med.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {prescription.prescriptionImage && (
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <div className="h-4 w-4 rounded overflow-hidden mr-1">
                <img 
                  src={prescription.prescriptionImage.fileUrl} 
                  alt="Ordonnance"
                  className="h-full w-full object-cover"
                />
              </div>
              <span>{prescription.prescriptionImage.fileName}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionItem;
