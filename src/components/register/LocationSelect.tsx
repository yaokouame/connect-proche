
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ivoryCoastRegions, ivoryCoastCities } from "@/data/locationData";

interface LocationSelectProps {
  region: string;
  setRegion: (region: string) => void;
  city: string;
  setCity: (city: string) => void;
  address: string;
  setAddress: (address: string) => void;
  translations: {
    region: string;
    regionPlaceholder: string;
    city: string;
    cityPlaceholder: string;
    address: string;
    addressPlaceholder: string;
    location: string;
  };
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  region,
  setRegion,
  city,
  setCity,
  address,
  setAddress,
  translations
}) => {
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Update available cities when region changes
  useEffect(() => {
    if (region) {
      setAvailableCities(ivoryCoastCities[region] || []);
      setCity(""); // Reset city when region changes
    } else {
      setAvailableCities([]);
    }
  }, [region, setCity]);

  return (
    <div className="space-y-2">
      <h3 className="text-md font-medium">{translations.location}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="region">{translations.region}</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder={translations.regionPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {ivoryCoastRegions.map((regionName) => (
                <SelectItem key={regionName} value={regionName}>
                  {regionName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">{translations.city}</Label>
          <Select value={city} onValueChange={setCity} disabled={!region}>
            <SelectTrigger>
              <SelectValue placeholder={translations.cityPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {availableCities.map((cityName) => (
                <SelectItem key={cityName} value={cityName}>
                  {cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">{translations.address}</Label>
        <Textarea
          id="address"
          placeholder={translations.addressPlaceholder}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default LocationSelect;
