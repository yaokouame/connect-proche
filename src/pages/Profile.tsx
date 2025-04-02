
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { Prescription, PatientProfile } from "@/types/user";
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

  useEffect(() => {
    if (currentUser && currentUser.role === "patient") {
      const patientUser = currentUser as PatientProfile;
      if (patientUser.medicalHistory) setMedicalHistory(patientUser.medicalHistory);
      if (patientUser.medications) setMedications(patientUser.medications);
      if (patientUser.allergies) setAllergies(patientUser.allergies);
      
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
        JSON.stringify(patientUser.allergies || []) !== JSON.stringify(allergies);
      
      setUnsavedChanges(hasChanges);
    }
  }, [currentUser, medicalHistory, medications, allergies]);

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
