
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import { Prescription } from "@/types/user";
import PrescriptionList from "../prescriptions/PrescriptionList";
import PrescriptionUploader from "../prescriptions/PrescriptionUploader";

interface PrescriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userPrescriptions: Prescription[];
  onPrescriptionSelect: (prescription: Prescription) => void;
  selectedPrescription: Prescription | null;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  currentUserId: string;
}

const PrescriptionDialog = ({
  isOpen,
  onClose,
  userPrescriptions,
  onPrescriptionSelect,
  selectedPrescription,
  isUploading,
  setIsUploading,
  currentUserId
}: PrescriptionDialogProps) => {
  const { toast } = useToast();
  const [localSelectedPrescription, setLocalSelectedPrescription] = useState<Prescription | null>(null);

  const handlePrescriptionSelect = (prescription: Prescription) => {
    setLocalSelectedPrescription(prescription);
  };

  const handleFileSelected = (file: File) => {
    setIsUploading(true);
    
    setTimeout(() => {
      const newPrescription: Prescription = {
        id: `presc-${Date.now()}`,
        patientId: currentUserId || "guest",
        professionalId: "unknown",
        professionalName: "Ordonnance externe",
        date: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: "active",
        medications: [],
        instructions: "Ordonnance externe téléchargée via l'application",
        prescriptionImage: {
          id: `file-${Date.now()}`,
          fileUrl: URL.createObjectURL(file),
          fileName: file.name,
          uploadDate: new Date().toISOString().split('T')[0],
          verified: false
        }
      };
      
      onPrescriptionSelect(newPrescription);
      setIsUploading(false);
      
      toast({
        title: "Ordonnance téléchargée",
        description: "Votre ordonnance a été téléchargée et sera vérifiée par un pharmacien.",
      });
    }, 1500);
  };

  const handleConfirm = () => {
    if (localSelectedPrescription) {
      onPrescriptionSelect(localSelectedPrescription);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ordonnance requise</DialogTitle>
          <DialogDescription>
            Ce médicament nécessite une ordonnance valide. Veuillez fournir une ordonnance pour continuer.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <PrescriptionList 
            prescriptions={userPrescriptions}
            selectedPrescription={localSelectedPrescription}
            onPrescriptionSelect={handlePrescriptionSelect}
          />
          
          {userPrescriptions.length > 0 && (
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou</span>
              </div>
            </div>
          )}
          
          <PrescriptionUploader 
            isUploading={isUploading}
            onFileSelected={handleFileSelected}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          {localSelectedPrescription && (
            <Button onClick={handleConfirm}>
              Confirmer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionDialog;
