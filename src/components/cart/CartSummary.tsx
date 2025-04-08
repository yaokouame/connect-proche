
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/types/user";
import ShippingMethodSelector from "./ShippingMethodSelector";
import PromoCodeInput from "./PromoCodeInput";
import OrderSummaryDetails from "./OrderSummaryDetails";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderSummaryDetails 
          subtotal={subtotal}
          shippingCost={shippingCost}
          discount={discount}
          total={total}
        />

        <ShippingMethodSelector 
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />

        <div className="mt-4">
          <PromoCodeInput
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            applyCoupon={applyCoupon}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={nextStep}>Passer à la livraison</Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
