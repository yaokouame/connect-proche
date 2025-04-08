
import React, { useRef, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Check } from "lucide-react";
import { Prescription } from "@/types/user";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "application/pdf") {
      toast({
        title: "Format de fichier non supporté",
        description: "Veuillez télécharger une image (JPEG, PNG) ou un PDF",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 5 Mo",
        variant: "destructive"
      });
      return;
    }

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
          {userPrescriptions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Vos ordonnances disponibles</h3>
              <div className="space-y-2">
                {userPrescriptions
                  .filter(p => p.status === "active")
                  .map(prescription => (
                    <div 
                      key={prescription.id}
                      className={`border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors
                                ${selectedPrescription?.id === prescription.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => onPrescriptionSelect(prescription)}
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
                ))}
              </div>
            </div>
          )}
          
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
          
          <div>
            <h3 className="text-sm font-medium mb-2">Télécharger une nouvelle ordonnance</h3>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/jpeg,image/png,application/pdf" 
              className="hidden" 
            />
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={triggerFileInput}
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                  Téléchargement...
                </div>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Télécharger ordonnance
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              Formats acceptés: JPEG, PNG, PDF (max 5 Mo)
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionDialog;
