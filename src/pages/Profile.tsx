
import React from "react";
import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { PatientProfile } from "@/types/user";
import { useProfileData } from "@/hooks/useProfileData";

// Import components
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileTabs from "@/components/profile/ProfileTabs";
import LoginPrompt from "@/components/profile/LoginPrompt";

const ProfilePage = () => {
  const { currentUser, updateUserProfile } = useUser();
  const { toast } = useToast();
  
  const {
    medicalHistory,
    setMedicalHistory,
    medications,
    setMedications,
    allergies,
    setAllergies,
    prescriptions,
    activeTab,
    setActiveTab,
    unsavedChanges,
    bloodType,
    setBloodType,
    vaccinations,
    setVaccinations,
    emergencyContact,
    setEmergencyContact
  } = useProfileData(currentUser);

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
            <ProfileTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              currentUser={currentUser}
              updateUserProfile={updateUserProfile}
              unsavedChanges={unsavedChanges}
              medicalHistory={medicalHistory}
              setMedicalHistory={setMedicalHistory}
              medications={medications}
              setMedications={setMedications}
              allergies={allergies}
              setAllergies={setAllergies}
              prescriptions={prescriptions}
              bloodType={bloodType}
              setBloodType={setBloodType}
              vaccinations={vaccinations}
              setVaccinations={setVaccinations}
              emergencyContact={emergencyContact}
              setEmergencyContact={setEmergencyContact}
              saveMedicalData={saveMedicalData}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
