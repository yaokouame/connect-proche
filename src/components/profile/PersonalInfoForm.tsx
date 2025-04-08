
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, PatientProfile } from "@/types/user";
import { useLanguage } from "@/contexts/LanguageContext";

// Import the new form components
import PersonalDetailsForm from "./form/PersonalDetailsForm";
import ProfessionalDetailsForm from "./form/ProfessionalDetailsForm";
import LocationDetailsForm from "./form/LocationDetailsForm";

interface PersonalInfoFormProps {
  currentUser: User;
  updateUserProfile: (user: User) => void;
}

const PersonalInfoForm = ({ currentUser, updateUserProfile }: PersonalInfoFormProps) => {
  const { language } = useLanguage();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [cmuCardNumber, setCmuCardNumber] = useState(
    (currentUser as PatientProfile)?.cmuCardNumber || ""
  );
  
  // Location fields
  const [city, setCity] = useState(currentUser?.location?.city || "");
  const [region, setRegion] = useState(currentUser?.location?.region || "");
  const [address, setAddress] = useState(currentUser?.location?.address || "");
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        name,
        email,
        ...(currentUser.role === 'patient' && { cmuCardNumber }),
        location: {
          city,
          region,
          address
        }
      };
      
      updateUserProfile(updatedUser);
      setIsSaving(false);
    }, 1000);
  };

  const getTranslations = () => {
    if (language === 'fr') {
      return {
        personalInfo: "Informations personnelles",
        fullName: "Nom complet",
        cmuCardNumber: "Numéro de carte CMU",
        specialty: "Spécialité",
        license: "Numéro de licence",
        location: "Localisation",
        city: "Ville",
        region: "Région",
        address: "Adresse",
        saving: "Enregistrement...",
        save: "Enregistrer les modifications"
      };
    } else if (language === 'es') {
      return {
        personalInfo: "Información personal",
        fullName: "Nombre completo",
        cmuCardNumber: "Número de tarjeta CMU",
        specialty: "Especialidad",
        license: "Número de licencia",
        location: "Ubicación",
        city: "Ciudad",
        region: "Región",
        address: "Dirección",
        saving: "Guardando...",
        save: "Guardar cambios"
      };
    } else {
      return {
        personalInfo: "Personal Information",
        fullName: "Full name",
        cmuCardNumber: "CMU Card Number",
        specialty: "Specialty",
        license: "License number",
        location: "Location",
        city: "City",
        region: "Region",
        address: "Address",
        saving: "Saving...",
        save: "Save changes"
      };
    }
  };

  const translations = getTranslations();
  const isPatient = currentUser?.role === "patient";
  const isProfessional = currentUser?.role === "professional";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.personalInfo}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <PersonalDetailsForm 
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            cmuCardNumber={cmuCardNumber}
            setCmuCardNumber={setCmuCardNumber}
            isPatient={isPatient}
            translations={translations}
          />
          
          {isProfessional && (
            <ProfessionalDetailsForm 
              specialty={(currentUser as any).specialty || ""}
              license={(currentUser as any).license || ""}
              translations={translations}
            />
          )}
          
          <LocationDetailsForm 
            city={city}
            setCity={setCity}
            region={region}
            setRegion={setRegion}
            address={address}
            setAddress={setAddress}
            translations={translations}
          />
          
          <Button type="submit" className="mt-6" disabled={isSaving}>
            {isSaving ? translations.saving : translations.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
