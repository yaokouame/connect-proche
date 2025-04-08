
import { useState } from "react";
import { Product, Prescription } from "@/types/user";

export const usePrescriptionHandling = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isPrescriptionUploadOpen, setIsPrescriptionUploadOpen] = useState(false);

  const handlePrescriptionSelect = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setIsPrescriptionUploadOpen(false);
  };

  const resetPrescriptionState = () => {
    setSelectedProduct(null);
    setSelectedPrescription(null);
  };

  return {
    selectedProduct,
    setSelectedProduct,
    selectedPrescription,
    setSelectedPrescription,
    isPrescriptionUploadOpen,
    setIsPrescriptionUploadOpen,
    handlePrescriptionSelect,
    resetPrescriptionState
  };
};
