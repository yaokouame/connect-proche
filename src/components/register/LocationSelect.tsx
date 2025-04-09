
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ivoryCoastRegions, ivoryCoastCities } from "@/data/locationData";

interface LocationSelectProps {
  formData: {
    region: string;
    city: string;
    address: string;
    [key: string]: any;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  translations: {
    region: string;
    regionPlaceholder: string;
    city: string;
    cityPlaceholder: string;
    address: string;
    addressPlaceholder: string;
    location?: string;
  };
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  translations
}) => {
  return (
    <div className="space-y-4 mt-4">
      {translations.location && (
        <h3 className="text-md font-medium">{translations.location}</h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="region">{translations.region}</Label>
          <Select 
            value={formData.region} 
            onValueChange={(value) => handleSelectChange("region", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={translations.regionPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {ivoryCoastRegions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">{translations.city}</Label>
          <Select 
            value={formData.city} 
            onValueChange={(value) => handleSelectChange("city", value)}
            disabled={!formData.region}
          >
            <SelectTrigger>
              <SelectValue placeholder={translations.cityPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {formData.region && ivoryCoastCities[formData.region]?.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">{translations.address}</Label>
        <Input
          id="address"
          name="address"
          placeholder={translations.addressPlaceholder}
          value={formData.address}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default LocationSelect;
