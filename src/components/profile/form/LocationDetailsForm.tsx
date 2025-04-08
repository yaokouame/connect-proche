
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface LocationDetailsFormProps {
  city: string;
  setCity: (city: string) => void;
  region: string;
  setRegion: (region: string) => void;
  address: string;
  setAddress: (address: string) => void;
  translations: Record<string, string>;
}

const LocationDetailsForm = ({
  city,
  setCity,
  region,
  setRegion,
  address,
  setAddress,
  translations
}: LocationDetailsFormProps) => {
  return (
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
  );
};

export default LocationDetailsForm;
