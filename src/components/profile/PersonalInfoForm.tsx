
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
        cmuCardNumber,
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
          
          {/* Location information section */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-medium mb-2">{translations.location}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{translations.city}</Label>
                <Input 
                  id="city" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  placeholder="Abidjan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">{translations.region}</Label>
                <Input 
                  id="region" 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)} 
                  placeholder="Cocody"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{translations.address}</Label>
              <Textarea 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Rue des Jardins 123"
              />
            </div>
          </div>
          
          <Button type="submit" className="mt-6" disabled={isSaving}>
            {isSaving ? translations.saving : translations.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
