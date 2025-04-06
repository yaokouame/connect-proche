
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { Prescription, PatientProfile, Vaccination, EmergencyContact } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import MedicalRecordSection from "@/components/profile/MedicalRecordSection";
import PreferencesSection from "@/components/profile/PreferencesSection";
import LoginPrompt from "@/components/profile/LoginPrompt";

const ProfilePage = () => {
  const { currentUser, updateUserProfile } = useUser();
  const { toast } = useToast();
  
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [activeTab, setActiveTab] = useState("personal");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // New state for complete health profile
  const [bloodType, setBloodType] = useState<string>("unknown");
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | undefined>(undefined);

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

  const saveMedicalData = () => {
    if (currentUser && currentUser.role === "patient") {
      // Create an updated profile with the correct type
      const updatedProfile = {
        ...currentUser,
      };
      
      // Cast to PatientProfile to safely add the medical fields
      const patientProfile = updatedProfile as PatientProfile;
      patientProfile.medicalHistory = medicalHistory;
      patientProfile.medications = medications;
      patientProfile.allergies = allergies;
      patientProfile.bloodType = bloodType as PatientProfile["bloodType"];
      patientProfile.vaccinations = vaccinations;
      patientProfile.emergencyContact = emergencyContact;
      
      // Update the user profile
      updateUserProfile(patientProfile);
      
      setUnsavedChanges(false);
      
      toast({
        title: "Données médicales mises à jour",
        description: "Votre dossier médical a été mis à jour avec succès.",
      });
    }
  };

  if (!currentUser) {
    return (
      <Layout>
        <LoginPrompt />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-health-dark">Mon profil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <ProfileSidebar currentUser={currentUser} />
          </div>

          <div className="md:col-span-2">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="medical">
                  Dossier médical
                  {unsavedChanges && (
                    <span className="ml-2 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="preferences">Préférences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <PersonalInfoForm
                  currentUser={currentUser}
                  updateUserProfile={updateUserProfile}
                />
              </TabsContent>
              
              <TabsContent value="medical">
                {unsavedChanges && (
                  <div className="mb-4 flex justify-end">
                    <button
                      onClick={saveMedicalData}
                      className="bg-health-blue text-white py-2 px-4 rounded-lg hover:bg-health-dark transition"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                )}
                
                <MedicalRecordSection
                  medicalHistory={medicalHistory}
                  setMedicalHistory={setMedicalHistory}
                  medications={medications}
                  setMedications={setMedications}
                  allergies={allergies}
                  setAllergies={setAllergies}
                  prescriptions={prescriptions}
                  userRole={currentUser?.role || "none"}
                  bloodType={bloodType}
                  setBloodType={setBloodType}
                  vaccinations={vaccinations}
                  setVaccinations={setVaccinations}
                  emergencyContact={emergencyContact}
                  setEmergencyContact={setEmergencyContact}
                  patientId={currentUser.id}
                />
              </TabsContent>
              
              <TabsContent value="preferences">
                <PreferencesSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
