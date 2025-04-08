
import { useState, useEffect } from "react";
import { Prescription } from "@/types/user";

export const usePrescriptionData = () => {
  const [userPrescriptions, setUserPrescriptions] = useState<Prescription[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // In a real app, we'd fetch this from an API
    const mockPrescriptions: Prescription[] = [
      {
        id: "presc-1",
        patientId: "patient-456",
        professionalId: "pro-123",
        professionalName: "Jean Michel",
        date: "15/09/2023",
        expiryDate: "15/12/2023",
        status: "active",
        medications: [
          {
            name: "Amoxicilline",
            dosage: "500mg",
            frequency: "3 fois par jour",
            duration: "7 jours"
          },
          {
            name: "Doliprane",
            dosage: "1000mg",
            frequency: "Si douleur",
            duration: "Au besoin"
          }
        ],
        instructions: "Prendre avec de la nourriture. Terminer le traitement complet même si les symptômes s'améliorent.",
        prescriptionImage: {
          id: "file-1",
          fileUrl: "/placeholder.svg",
          fileName: "ordonnance_sept2023.jpg",
          uploadDate: "2023-09-15",
          verified: true,
          verifiedBy: "Pharmacie Centrale",
          verificationDate: "2023-09-15"
        }
      }
    ];

    setUserPrescriptions(mockPrescriptions);
  }, []);

  return {
    userPrescriptions,
    isUploading,
    setIsUploading
  };
};
