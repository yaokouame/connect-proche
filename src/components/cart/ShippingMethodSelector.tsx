
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, Clock, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ShippingMethodSelectorProps {
  shippingMethod: string;
  setShippingMethod: (value: string) => void;
}

const ShippingMethodSelector = ({
  shippingMethod,
  setShippingMethod
}: ShippingMethodSelectorProps) => {
  // Calculate estimated delivery date
  const getEstimatedDelivery = (method: string) => {
    const today = new Date();
    let days = 0;
    
    switch (method) {
      case "express":
        days = 2; // 1-2 days
        break;
      case "standard":
        days = 5; // 3-5 days
        break;
      case "pickup":
        days = 1; // Next day
        break;
      default:
        days = 5;
    }
    
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);
    return deliveryDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  };

  return (
    <div className="pt-4">
      <Label htmlFor="shipping-method" className="block mb-3 text-sm font-medium">Méthode de livraison</Label>
      
      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="standard" id="standard-method" />
          <Label htmlFor="standard-method" className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Standard (3-5 jours)</p>
                </div>
              </div>
              <span className="font-medium text-sm">3 999 F CFA</span>
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-600">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Livraison estimée: {getEstimatedDelivery('standard')}</span>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="express" id="express-method" />
          <Label htmlFor="express-method" className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500" />
                <div className="flex items-center gap-1">
                  <p className="font-medium text-sm">Express (1-2 jours)</p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs py-0">Rapide</Badge>
                </div>
              </div>
              <span className="font-medium text-sm">7 999 F CFA</span>
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-600">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Livraison estimée: {getEstimatedDelivery('express')}</span>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="pickup" id="pickup-method" />
          <Label htmlFor="pickup-method" className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-500" />
                <p className="font-medium text-sm">Point relais</p>
              </div>
              <span className="font-medium text-sm">1 999 F CFA</span>
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-600">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Disponible dès: {getEstimatedDelivery('pickup')}</span>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ShippingMethodSelector;
