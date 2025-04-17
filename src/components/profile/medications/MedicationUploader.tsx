
import React, { useRef, useState } from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MedicationUploaderProps {
  onMedicationExtracted: (medication: string) => void;
}

const MedicationUploader = ({ onMedicationExtracted }: MedicationUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
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
      onMedicationExtracted("Médicament extrait de l'ordonnance");
      
      setIsUploading(false);
      
      toast({
        title: "Ordonnance traitée",
        description: "Les médicaments de votre ordonnance ont été ajoutés à votre liste.",
      });
    }, 1500);
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/jpeg,image/png,application/pdf" 
        className="hidden" 
      />
      
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
    </>
  );
};

export default MedicationUploader;
