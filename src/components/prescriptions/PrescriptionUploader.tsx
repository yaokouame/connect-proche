
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PrescriptionUploaderProps {
  isUploading: boolean;
  onFileSelected: (file: File) => void;
}

const PrescriptionUploader: React.FC<PrescriptionUploaderProps> = ({
  isUploading,
  onFileSelected,
}) => {
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

    onFileSelected(file);
  };

  return (
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
  );
};

export default PrescriptionUploader;
