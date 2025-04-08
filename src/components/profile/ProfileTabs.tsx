
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "./PersonalInfoForm";
import MedicalRecordSection from "./MedicalRecordSection";
import PreferencesSection from "./PreferencesSection";
import { User, PatientProfile, Prescription, Vaccination, EmergencyContact } from "@/types/user";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  currentUser: User;
  updateUserProfile: (user: User) => void;
  unsavedChanges: boolean;
  medicalHistory: string[];
  setMedicalHistory: React.Dispatch<React.SetStateAction<string[]>>;
  medications: string[];
  setMedications: React.Dispatch<React.SetStateAction<string[]>>;
  allergies: string[];
  setAllergies: React.Dispatch<React.SetStateAction<string[]>>;
  prescriptions: Prescription[];
  bloodType: string;
  setBloodType: React.Dispatch<React.SetStateAction<string>>;
  vaccinations: Vaccination[];
  setVaccinations: React.Dispatch<React.SetStateAction<Vaccination[]>>;
  emergencyContact: EmergencyContact | undefined;
  setEmergencyContact: React.Dispatch<React.SetStateAction<EmergencyContact | undefined>>;
  saveMedicalData: () => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  updateUserProfile,
  unsavedChanges,
  medicalHistory,
  setMedicalHistory,
  medications,
  setMedications,
  allergies,
  setAllergies,
  prescriptions,
  bloodType,
  setBloodType,
  vaccinations,
  setVaccinations,
  emergencyContact,
  setEmergencyContact,
  saveMedicalData
}) => {
  return (
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
  );
};

export default ProfileTabs;
