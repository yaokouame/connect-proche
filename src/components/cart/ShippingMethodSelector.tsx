
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
      <Label htmlFor="shipping-method" className="block mb-2 text-sm font-medium">Méthode de livraison</Label>
      <Select value={shippingMethod} onValueChange={setShippingMethod}>
        <SelectTrigger id="shipping-method" className="w-full">
          <SelectValue placeholder="Choisir une méthode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-500" />
              <span>Standard (3-5 jours) - 3 999 F CFA</span>
            </div>
          </SelectItem>
          <SelectItem value="express">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <span>Express (1-2 jours) - 7 999 F CFA</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShippingMethodSelector;
