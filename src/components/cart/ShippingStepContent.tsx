
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ShippingForm from "@/components/payment/ShippingForm";
import { CartItem } from "@/types/user";
import { Calendar, MapPin, Truck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ShippingStepContentProps {
  cartItems: CartItem[];
  shippingInfo: {
    fullName: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  handleShippingInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCountry: (value: string) => void;
  shippingMethod: string;
  setShippingMethod: (value: string) => void;
  total: number;
  prevStep: () => void;
  nextStep: () => void;
}

const ShippingStepContent = ({
  cartItems,
  shippingInfo,
  handleShippingInfoChange,
  setCountry,
  shippingMethod,
  setShippingMethod,
  total,
  prevStep,
  nextStep,
}: ShippingStepContentProps) => {
  // Calculate estimated delivery dates
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

  // Validate form before proceeding
  const validateShippingInfo = () => {
    const { fullName, streetAddress, city, postalCode, country, phone } = shippingInfo;
    return fullName && streetAddress && city && postalCode && country && phone;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Adresse de livraison</CardTitle>
            <CardDescription>Veuillez entrer vos informations de livraison</CardDescription>
          </CardHeader>
          <CardContent>
            <ShippingForm 
              shippingInfo={shippingInfo}
              handleChange={handleShippingInfoChange}
              setCountry={(value) => setCountry(value)}
            />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Mode de livraison</CardTitle>
            <CardDescription>Sélectionnez votre méthode de livraison préférée</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={shippingMethod} 
              onValueChange={setShippingMethod}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Livraison standard</p>
                        <p className="text-sm text-gray-500">3-5 jours ouvrés</p>
                      </div>
                    </div>
                    <span className="font-medium">3 999 F CFA</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Livraison estimée: {getEstimatedDelivery('standard')}</span>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Livraison express</p>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Rapide</Badge>
                        </div>
                        <p className="text-sm text-gray-500">1-2 jours ouvrés</p>
                      </div>
                    </div>
                    <span className="font-medium">7 999 F CFA</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Livraison estimée: {getEstimatedDelivery('express')}</span>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Retrait en point relais</p>
                        <p className="text-sm text-gray-500">Disponible dès le lendemain</p>
                      </div>
                    </div>
                    <span className="font-medium">1 999 F CFA</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Disponible dès: {getEstimatedDelivery('pickup')}</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Récapitulatif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                <p>Articles: {cartItems.length}</p>
                <p>Livraison: {
                  shippingMethod === "express" ? "Express (1-2 jours)" : 
                  shippingMethod === "pickup" ? "Point relais (dès demain)" :
                  "Standard (3-5 jours)"
                }</p>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{total.toFixed(2)} F CFA</span>
              </div>
              <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm text-blue-700">
                  Livraison estimée: <strong>{getEstimatedDelivery(shippingMethod)}</strong>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Retour</Button>
            <Button 
              onClick={nextStep}
              disabled={!validateShippingInfo()}
            >
              Continuer vers le paiement
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ShippingStepContent;
