
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShippingFormProps {
  shippingInfo: {
    fullName: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCountry: (value: string) => void;
}

const ShippingForm = ({
  shippingInfo,
  handleChange,
  setCountry,
}: ShippingFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Nom complet</Label>
        <Input
          id="fullName"
          name="fullName"
          value={shippingInfo.fullName}
          onChange={handleChange}
          placeholder="Prénom Nom"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="streetAddress">Adresse</Label>
        <Input
          id="streetAddress"
          name="streetAddress"
          value={shippingInfo.streetAddress}
          onChange={handleChange}
          placeholder="Numéro et nom de rue"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            placeholder="Ville"
            required
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Code postal</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleChange}
            placeholder="Code postal"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="country">Pays</Label>
        <Select 
          value={shippingInfo.country} 
          onValueChange={setCountry}
        >
          <SelectTrigger id="country">
            <SelectValue placeholder="Sélectionner un pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="France">France</SelectItem>
            <SelectItem value="Belgique">Belgique</SelectItem>
            <SelectItem value="Suisse">Suisse</SelectItem>
            <SelectItem value="Luxembourg">Luxembourg</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleChange}
          placeholder="Numéro de téléphone"
          required
        />
      </div>
    </div>
  );
};

export default ShippingForm;
