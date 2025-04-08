
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface ShippingInfo {
  fullName: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
}

interface OrderAddressCardsProps {
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  lastFourDigits?: string;
}

const OrderAddressCards = ({ shippingInfo, paymentMethod, lastFourDigits }: OrderAddressCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Adresse de livraison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{shippingInfo.fullName}</p>
          <p>{shippingInfo.streetAddress}</p>
          <p>{shippingInfo.postalCode} {shippingInfo.city}</p>
          <p>{shippingInfo.country}</p>
          <p className="mt-2 text-gray-500">{shippingInfo.phone}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Méthode de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">{paymentMethod}</p>
          {paymentMethod === "Carte bancaire" && lastFourDigits && (
            <p className="text-gray-500">**** **** **** {lastFourDigits}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderAddressCards;
