
import { useState, useEffect } from "react";
import { User, PatientProfile, Prescription, Vaccination, EmergencyContact } from "@/types/user";

export const useProfileData = (currentUser: User | null) => {
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [activeTab, setActiveTab] = useState("personal");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [bloodType, setBloodType] = useState<string>("unknown");
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | undefined>(undefined);

  // Mock prescriptions data
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
      instructions: "Prendre avec de la nourriture. Terminer le traitement complet même si les symptômes s'améliorent."
    },
    {
      id: "presc-2",
      patientId: "patient-456",
      professionalId: "pro-124",
      professionalName: "Sophie Martin",
      date: "25/07/2023",
      expiryDate: "25/10/2023",
      status: "expired",
      medications: [
        {
          name: "Ventoline",
          dosage: "100µg",
          frequency: "2 inhalations",
          duration: "En cas de crise"
        }
      ],
      instructions: "Utiliser en cas de difficulté respiratoire."
    }
  ];

  // Sample vaccinations data
  const mockVaccinations: Vaccination[] = [
    {
      id: "vacc-1",
      name: "COVID-19 (Pfizer)",
      date: "2021-05-15",
      expiryDate: "2022-05-15",
      batchNumber: "BNT162b2-L123456",
      provider: "Centre de vaccination Paris 15",
      notes: "Deuxième dose"
    },
    {
      id: "vacc-2",
      name: "Grippe saisonnière",
      date: "2022-10-10",
      provider: "Pharmacie du Centre",
      notes: "Vaccination annuelle"
    }
  ];

  useEffect(() => {
    if (currentUser && currentUser.role === "patient") {
      const patientUser = currentUser as PatientProfile;
      if (patientUser.medicalHistory) setMedicalHistory(patientUser.medicalHistory);
      if (patientUser.medications) setMedications(patientUser.medications);
      if (patientUser.allergies) setAllergies(patientUser.allergies);
      if (patientUser.bloodType) setBloodType(patientUser.bloodType);
      if (patientUser.emergencyContact) setEmergencyContact(patientUser.emergencyContact);
      
      // For demo purposes, we'll use mock data for vaccinations and prescriptions
      setVaccinations(patientUser.vaccinations || mockVaccinations);
      setPrescriptions(mockPrescriptions);
    }
  }, [currentUser]);

  // Check for unsaved changes when medical data updates
  useEffect(() => {
    if (currentUser && currentUser.role === "patient") {
      const patientUser = currentUser as PatientProfile;
      const hasChanges = 
        JSON.stringify(patientUser.medicalHistory || []) !== JSON.stringify(medicalHistory) ||
        JSON.stringify(patientUser.medications || []) !== JSON.stringify(medications) ||
        JSON.stringify(patientUser.allergies || []) !== JSON.stringify(allergies) ||
        patientUser.bloodType !== bloodType ||
        JSON.stringify(patientUser.vaccinations || []) !== JSON.stringify(vaccinations) ||
        JSON.stringify(patientUser.emergencyContact || {}) !== JSON.stringify(emergencyContact || {});
      
      setUnsavedChanges(hasChanges);
    }
  }, [currentUser, medicalHistory, medications, allergies, bloodType, vaccinations, emergencyContact]);

  return {
    medicalHistory,
    setMedicalHistory,
    medications,
    setMedications,
    allergies,
    setAllergies,
    prescriptions,
    setPrescriptions,
    activeTab,
    setActiveTab,
    unsavedChanges,
    setUnsavedChanges,
    bloodType,
    setBloodType,
    vaccinations,
    setVaccinations,
    emergencyContact,
    setEmergencyContact
  };
};
