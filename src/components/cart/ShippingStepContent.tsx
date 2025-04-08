
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ShippingForm from "@/components/payment/ShippingForm";
import { CartItem } from "@/types/user";

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
  total,
  prevStep,
  nextStep,
}: ShippingStepContentProps) => {
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
                <p>Livraison: {shippingMethod === "express" ? "Express (1-2 jours)" : "Standard (3-5 jours)"}</p>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Retour</Button>
            <Button onClick={nextStep}>Continuer vers le paiement</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ShippingStepContent;
