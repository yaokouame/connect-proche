
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Clock } from "lucide-react";

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
          <SelectItem value="standard" className="flex items-center">
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2 text-blue-500" />
              <span>Standard (3-5 jours) - 3,99 €</span>
            </div>
          </SelectItem>
          <SelectItem value="express" className="flex items-center">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-green-500" />
              <span>Express (1-2 jours) - 7,99 €</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShippingMethodSelector;
