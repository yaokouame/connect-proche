
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
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
  showVoiceHelp?: boolean;
  onSpeakField?: (fieldName: string) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  region,
  setRegion,
  city,
  setCity,
  address,
  setAddress,
  translations,
  showVoiceHelp = false,
  onSpeakField
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
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium">{translations.location}</h3>
        {showVoiceHelp && onSpeakField && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => onSpeakField("location")}
            title="Écouter les instructions pour cette section"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="region">{translations.region}</Label>
            {showVoiceHelp && onSpeakField && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => onSpeakField("region")}
                title="Écouter les instructions pour ce champ"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
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
          <div className="flex items-center justify-between">
            <Label htmlFor="city">{translations.city}</Label>
            {showVoiceHelp && onSpeakField && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => onSpeakField("city")}
                title="Écouter les instructions pour ce champ"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
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
        <div className="flex items-center justify-between">
          <Label htmlFor="address">{translations.address}</Label>
          {showVoiceHelp && onSpeakField && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => onSpeakField("address")}
              title="Écouter les instructions pour ce champ"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
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
