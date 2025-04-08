
import React from "react";
import { Prescription } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, Paperclip, Upload } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";

interface PrescriptionDetailsProps {
  prescription: Prescription;
  isUploading: boolean;
  uploadingPrescriptionId: string | null;
  triggerFileInput: (prescriptionId: string) => void;
  useForPurchase: (prescription: Prescription) => void;
}

const PrescriptionDetails: React.FC<PrescriptionDetailsProps> = ({
  prescription,
  isUploading,
  uploadingPrescriptionId,
  triggerFileInput,
  useForPurchase,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-b pb-2">
        <p className="text-sm font-medium">Prescrite par:</p>
        <p>Dr. {prescription.professionalName}</p>
      </div>
      
      <div className="border-b pb-2">
        <p className="text-sm font-medium">Dates:</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p>{prescription.date}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Expiration</p>
            <p>{prescription.expiryDate}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Médicaments prescrits:</p>
        {prescription.medications.map((med, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium">{med.name}</p>
            <div className="grid grid-cols-3 gap-1 text-sm mt-1">
              <div>
                <p className="text-xs text-gray-500">Dosage</p>
                <p>{med.dosage}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Fréquence</p>
                <p>{med.frequency}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Durée</p>
                <p>{med.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {prescription.instructions && (
        <div className="border-t pt-2">
          <p className="text-sm font-medium">Instructions:</p>
          <p className="text-gray-700 whitespace-pre-line">{prescription.instructions}</p>
        </div>
      )}
      
      {/* Section for displaying/uploading the prescription document */}
      <div className="border-t pt-4">
        <p className="text-sm font-medium mb-2">Document d'ordonnance:</p>
        
        {prescription.prescriptionImage ? (
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Paperclip className="w-4 h-4 mr-2 text-blue-500" />
                <p className="text-sm">{prescription.prescriptionImage.fileName}</p>
              </div>
              <div>
                {prescription.prescriptionImage.verified ? (
                  <Badge className="bg-green-500 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Vérifié</span>
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-500 border-amber-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>En attente</span>
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden mb-2 max-h-[200px]">
              {/* If it's an image, show it directly */}
              <img 
                src={prescription.prescriptionImage.fileUrl} 
                alt="Ordonnance"
                className="w-full object-contain max-h-[200px]"
              />
            </div>
            
            <div className="text-xs text-gray-500">
              Téléchargé le {prescription.prescriptionImage.uploadDate}
            </div>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center" 
            onClick={() => triggerFileInput(prescription.id)}
            disabled={isUploading && uploadingPrescriptionId === prescription.id}
          >
            {isUploading && uploadingPrescriptionId === prescription.id ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                Téléchargement...
              </div>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Joindre l'ordonnance
              </>
            )}
          </Button>
        )}
      </div>
      
      <DialogFooter>
        {prescription.status === "active" && prescription.prescriptionImage && (
          <Button onClick={() => useForPurchase(prescription)}>
            Utiliser pour achat
          </Button>
        )}
      </DialogFooter>
    </div>
  );
};

export default PrescriptionDetails;
