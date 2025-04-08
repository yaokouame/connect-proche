
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfessionalDetailsFormProps {
  specialty: string;
  license: string;
  translations: Record<string, string>;
}

const ProfessionalDetailsForm = ({
  specialty,
  license,
  translations
}: ProfessionalDetailsFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="specialty">{translations.specialty}</Label>
        <Input 
          id="specialty" 
          value={specialty} 
          disabled
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="license">{translations.license}</Label>
        <Input 
          id="license" 
          value={license} 
          disabled
        />
      </div>
    </>
  );
};

export default ProfessionalDetailsForm;
