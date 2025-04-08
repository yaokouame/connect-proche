
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/types/user";
import ShippingMethodSelector from "./ShippingMethodSelector";
import PromoCodeInput from "./PromoCodeInput";
import OrderSummaryDetails from "./OrderSummaryDetails";
import { CalendarCheck } from "lucide-react";

interface CartSummaryProps {
  cartItems: CartItem[];
  shippingMethod: string;
  setShippingMethod: (value: string) => void;
  couponCode: string;
  setCouponCode: (value: string) => void;
  applyCoupon: () => void;
  nextStep: () => void;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

const CartSummary = ({
  cartItems,
  shippingMethod,
  setShippingMethod,
  couponCode,
  setCouponCode,
  applyCoupon,
  nextStep,
  subtotal,
  shippingCost,
  discount,
  total
}: CartSummaryProps) => {
  // Calculate estimated delivery date based on shipping method
  const getEstimatedDelivery = () => {
    const today = new Date();
    if (shippingMethod === "express") {
      // 1-2 days for express shipping
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 2);
      return deliveryDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    } else {
      // 3-5 days for standard shipping
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 5);
      return deliveryDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50">
        <CardTitle>Récapitulatif</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <OrderSummaryDetails 
          subtotal={subtotal}
          shippingCost={shippingCost}
          discount={discount}
          total={total}
          estimatedDelivery={getEstimatedDelivery()}
        />
        
        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100 flex items-center">
          <CalendarCheck className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-sm text-green-700">
            Livraison estimée: <strong>{getEstimatedDelivery()}</strong>
          </span>
        </div>

        <ShippingMethodSelector 
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />

        <div className="mt-4">
          <PromoCodeInput
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            applyCoupon={applyCoupon}
            discount={discount}
          />
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button className="w-full" onClick={nextStep}>Passer à la livraison</Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
