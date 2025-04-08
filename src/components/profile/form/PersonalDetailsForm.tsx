
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalDetailsFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  cmuCardNumber?: string;
  setCmuCardNumber?: (cmuCardNumber: string) => void;
  isPatient: boolean;
  translations: Record<string, string>;
}

const PersonalDetailsForm = ({
  name,
  setName,
  email,
  setEmail,
  cmuCardNumber,
  setCmuCardNumber,
  isPatient,
  translations
}: PersonalDetailsFormProps) => {
  return (
    <>
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
      
      {isPatient && setCmuCardNumber && (
        <div className="space-y-2">
          <Label htmlFor="cmuCardNumber">{translations.cmuCardNumber}</Label>
          <Input 
            id="cmuCardNumber" 
            value={cmuCardNumber || ""} 
            onChange={(e) => setCmuCardNumber(e.target.value)} 
            placeholder="123-456-789"
          />
        </div>
      )}
    </>
  );
};

export default PersonalDetailsForm;
