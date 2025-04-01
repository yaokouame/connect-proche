
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { Prescription } from "@/types/user";

// Import refactored components
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import MedicalRecordSection from "@/components/profile/MedicalRecordSection";
import PreferencesSection from "@/components/profile/PreferencesSection";
import LoginPrompt from "@/components/profile/LoginPrompt";

const ProfilePage = () => {
  const { currentUser, updateUserProfile } = useUser();
  
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

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
      const patientUser = currentUser as any;
      if (patientUser.medicalHistory) setMedicalHistory(patientUser.medicalHistory);
      if (patientUser.medications) setMedications(patientUser.medications);
      if (patientUser.allergies) setAllergies(patientUser.allergies);
      
      setPrescriptions(mockPrescriptions);
    }
  }, [currentUser]);

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
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="medical">Dossier médical</TabsTrigger>
                <TabsTrigger value="preferences">Préférences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <PersonalInfoForm
                  currentUser={currentUser}
                  updateUserProfile={updateUserProfile}
                />
              </TabsContent>
              
              <TabsContent value="medical">
                <MedicalRecordSection
                  medicalHistory={medicalHistory}
                  setMedicalHistory={setMedicalHistory}
                  medications={medications}
                  setMedications={setMedications}
                  allergies={allergies}
                  setAllergies={setAllergies}
                  prescriptions={prescriptions}
                  userRole={currentUser.role}
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
