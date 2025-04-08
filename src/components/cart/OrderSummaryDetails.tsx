
import React from "react";
import { Separator } from "@/components/ui/separator";
import { CalendarCheck } from "lucide-react";

interface OrderSummaryDetailsProps {
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  estimatedDelivery?: string;
}

const OrderSummaryDetails = ({
  subtotal,
  shippingCost,
  discount,
  total,
  estimatedDelivery
}: OrderSummaryDetailsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-500">Sous-total</span>
        <span>{subtotal.toFixed(0)} F CFA</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gray-500">Livraison</span>
        <span>{shippingCost.toFixed(0)} F CFA</span>
      </div>
      
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Réduction</span>
          <span>-{discount.toFixed(0)} F CFA</span>
        </div>
      )}
      
      <Separator />
      
      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{total.toFixed(0)} F CFA</span>
      </div>
    </div>
  );
};

export default OrderSummaryDetails;
