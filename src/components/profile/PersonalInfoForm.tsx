
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { useLanguage } from "@/contexts/LanguageContext";

interface PersonalInfoFormProps {
  currentUser: User;
  updateUserProfile: (user: User) => void;
}

const PersonalInfoForm = ({ currentUser, updateUserProfile }: PersonalInfoFormProps) => {
  const { language } = useLanguage();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [cmuCardNumber, setCmuCardNumber] = useState(currentUser?.cmuCardNumber || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        name,
        email,
        cmuCardNumber
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
        saving: "Saving...",
        save: "Save changes"
      };
    }
  };

  const translations = getTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.personalInfo}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{translations.fullName}</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          {currentUser?.role === "patient" && (
            <div className="space-y-2">
              <Label htmlFor="cmuCardNumber">{translations.cmuCardNumber}</Label>
              <Input 
                id="cmuCardNumber" 
                value={cmuCardNumber} 
                onChange={(e) => setCmuCardNumber(e.target.value)} 
                placeholder="123-456-789"
              />
            </div>
          )}
          
          {currentUser?.role === "professional" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="specialty">{translations.specialty}</Label>
                <Input 
                  id="specialty" 
                  value={(currentUser as any).specialty || ""}
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="license">{translations.license}</Label>
                <Input 
                  id="license" 
                  value={(currentUser as any).license || ""}
                  disabled
                />
              </div>
            </>
          )}
          
          <Button type="submit" className="mt-6" disabled={isSaving}>
            {isSaving ? translations.saving : translations.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
