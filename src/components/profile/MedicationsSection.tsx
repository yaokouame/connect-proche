
import React, { useState, useRef } from "react";
import MedicalRecordList from "./MedicalRecordList";
import { Button } from "@/components/ui/button";
import { Paperclip, Plus, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MedicationForm, { MedicationFormValues } from "../medications/MedicationForm";

interface MedicationsSectionProps {
  medications: string[];
  addMedication: (item: string) => void;
  removeMedication: (index: number) => void;
}

const MedicationsSection = ({
  medications,
  addMedication,
  removeMedication
}: MedicationsSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
    
    // Simuler un téléchargement et traitement d'ordonnance
    setTimeout(() => {
      // Dans une application réelle, cette partie enverrait le fichier à un serveur
      // qui extrairait les médicaments de l'ordonnance via OCR ou un autre système
      // et renverrait la liste des médicaments.
      
      // Pour la démo, nous allons simplement ajouter un médicament fictif
      addMedication("Médicament extrait de l'ordonnance");
      
      setIsUploading(false);
      
      toast({
        title: "Ordonnance traitée",
        description: "Les médicaments de votre ordonnance ont été ajoutés à votre liste.",
      });
    }, 1500);
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleSubmit = (data: MedicationFormValues) => {
    // Add the medication
    addMedication(data.name);
    
    // Show success message
    toast({
      title: "Médicament ajouté",
      description: `${data.name} a été ajouté à votre liste de médicaments.`,
    });
  };

  return (
    <div className="space-y-4 border-b pt-4 pb-4">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/jpeg,image/png,application/pdf" 
        className="hidden" 
      />
      
      <MedicalRecordList
        title="Médicaments actuels"
        items={medications}
        onAddItem={addMedication}
        onRemoveItem={removeMedication}
        placeholder="Ajouter un médicament"
      />
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={openAddDialog}
          className="text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Ajouter manuellement
        </Button>
          
        <Button 
          variant="outline" 
          size="sm" 
          onClick={triggerFileInput}
          disabled={isUploading}
          className="text-xs"
        >
          {isUploading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary mr-2"></div>
              Traitement...
            </div>
          ) : (
            <>
              <Paperclip className="h-3 w-3 mr-1" />
              Extraire d'une ordonnance
            </>
          )}
        </Button>
      </div>
      
      {/* Add Medication Dialog */}
      <MedicationForm 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MedicationsSection;
