
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, User } from "lucide-react";

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
      <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-blue-700 text-sm mb-4">
        <p className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          Veuillez saisir une adresse de livraison valide pour garantir une livraison réussie
        </p>
      </div>
      
      <div>
        <Label htmlFor="fullName" className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          Nom complet
        </Label>
        <Input
          id="fullName"
          name="fullName"
          value={shippingInfo.fullName}
          onChange={handleChange}
          placeholder="Prénom Nom"
          required
          className="mt-1"
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
          className="mt-1"
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
            className="mt-1"
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
            className="mt-1"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="country">Pays</Label>
        <Select 
          value={shippingInfo.country} 
          onValueChange={setCountry}
        >
          <SelectTrigger id="country" className="mt-1">
            <SelectValue placeholder="Sélectionner un pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sénégal">Sénégal</SelectItem>
            <SelectItem value="Côte d'Ivoire">Côte d'Ivoire</SelectItem>
            <SelectItem value="Mali">Mali</SelectItem>
            <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
            <SelectItem value="Guinée">Guinée</SelectItem>
            <SelectItem value="Bénin">Bénin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="phone" className="flex items-center">
          <Phone className="h-4 w-4 mr-1" />
          Téléphone
        </Label>
        <Input
          id="phone"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleChange}
          placeholder="Numéro de téléphone"
          required
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">Nous vous contacterons à ce numéro en cas de problème de livraison</p>
      </div>
    </div>
  );
};

export default ShippingForm;
