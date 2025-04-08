
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Prescription } from "@/types/user";
import { FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionDetails from "./PrescriptionDetails";
import PrescriptionFileUploader from "./PrescriptionFileUploader";

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({ prescriptions }) => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingPrescriptionId, setUploadingPrescriptionId] = useState<string | null>(null);
  const fileUploaderRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, prescriptionId: string) => {
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
    setUploadingPrescriptionId(prescriptionId);
    
    // Simulate an upload
    setTimeout(() => {
      // In a real application, we would send the file to the server
      // and update the prescription with the uploaded file
      
      const mockPrescriptionFile = {
        id: `file-${Date.now()}`,
        fileUrl: URL.createObjectURL(file),
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        verified: false
      };
      
      // Update the local prescription with the uploaded file
      const updatedPrescriptions = prescriptions.map(p => {
        if (p.id === prescriptionId) {
          return { ...p, prescriptionImage: mockPrescriptionFile };
        }
        return p;
      });
      
      // In a real application, we would send the update to the server as well
      
      setIsUploading(false);
      setUploadingPrescriptionId(null);
      
      toast({
        title: "Ordonnance téléchargée",
        description: "Votre ordonnance a été téléchargée avec succès et sera vérifiée par un pharmacien",
      });
      
      // If the file is currently displayed, update the display
      if (selectedPrescription?.id === prescriptionId) {
        setSelectedPrescription({ ...selectedPrescription, prescriptionImage: mockPrescriptionFile });
      }
    }, 1500);
  };

  const triggerFileInput = (prescriptionId: string) => {
    if (fileUploaderRef.current) {
      fileUploaderRef.current.click();
      fileUploaderRef.current.dataset.prescriptionId = prescriptionId;
    }
  };

  const useForPurchase = (prescription: Prescription) => {
    // In a real application, this would mark this prescription for use
    // in an upcoming purchase and redirect to the products page
    toast({
      title: "Ordonnance sélectionnée",
      description: "Cette ordonnance sera utilisée pour votre prochain achat de médicaments",
    });
  };

  return (
    <div className="space-y-4">
      <PrescriptionFileUploader onFileSelected={handleFileChange} />
      
      {prescriptions.length === 0 ? (
        <p className="text-gray-500 italic">Aucune ordonnance enregistrée</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
              onViewDetails={() => setSelectedPrescription(prescription)}
              isUploading={isUploading}
              uploadingPrescriptionId={uploadingPrescriptionId}
              triggerFileInput={triggerFileInput}
              useForPurchase={useForPurchase}
            />
          ))}
        </div>
      )}

      <div className="pt-2 text-center">
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" /> Ajouter une ordonnance
        </Button>
      </div>

      {/* Prescription Details Dialog */}
      <Dialog 
        open={!!selectedPrescription} 
        onOpenChange={(open) => !open && setSelectedPrescription(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de l'ordonnance</DialogTitle>
          </DialogHeader>
          
          {selectedPrescription && (
            <PrescriptionDetails 
              prescription={selectedPrescription}
              isUploading={isUploading}
              uploadingPrescriptionId={uploadingPrescriptionId}
              triggerFileInput={triggerFileInput}
              useForPurchase={useForPurchase}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrescriptionList;
