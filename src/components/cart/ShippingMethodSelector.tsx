
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShippingMethodSelectorProps {
  shippingMethod: string;
  setShippingMethod: (value: string) => void;
}

const ShippingMethodSelector = ({
  shippingMethod,
  setShippingMethod
}: ShippingMethodSelectorProps) => {
  return (
    <div className="pt-4">
      <Label htmlFor="shipping-method">Méthode de livraison</Label>
      <Select value={shippingMethod} onValueChange={setShippingMethod}>
        <SelectTrigger id="shipping-method" className="w-full">
          <SelectValue placeholder="Choisir une méthode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">Standard (3-5 jours) - 3,99 €</SelectItem>
          <SelectItem value="express">Express (1-2 jours) - 7,99 €</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShippingMethodSelector;
