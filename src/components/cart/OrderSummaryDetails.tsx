
import React from "react";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryDetailsProps {
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

const OrderSummaryDetails = ({
  subtotal,
  shippingCost,
  discount,
  total
}: OrderSummaryDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Sous-total</span>
        <span>{subtotal.toFixed(2)} €</span>
      </div>
      <div className="flex justify-between">
        <span>Livraison</span>
        <span>{shippingCost.toFixed(2)} €</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Réduction</span>
          <span>-{discount.toFixed(2)} €</span>
        </div>
      )}
      <Separator />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{total.toFixed(2)} €</span>
      </div>
    </div>
  );
};

export default OrderSummaryDetails;
