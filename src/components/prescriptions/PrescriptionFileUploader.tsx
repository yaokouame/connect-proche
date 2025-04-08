
import React, { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PrescriptionFileUploaderProps {
  onFileSelected: (e: React.ChangeEvent<HTMLInputElement>, prescriptionId: string) => void;
}

const PrescriptionFileUploader: React.FC<PrescriptionFileUploaderProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <input 
      type="file" 
      ref={fileInputRef} 
      onChange={(e) => {
        const prescriptionId = fileInputRef.current?.dataset.prescriptionId;
        if (prescriptionId) {
          onFileSelected(e, prescriptionId);
        }
      }} 
      accept="image/jpeg,image/png,application/pdf" 
      className="hidden" 
    />
  );
};

export default PrescriptionFileUploader;
