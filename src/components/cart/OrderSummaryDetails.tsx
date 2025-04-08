
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Sous-total</span>
        <span>{subtotal.toFixed(0)} F CFA</span>
      </div>
      <div className="flex justify-between">
        <span>Livraison</span>
        <span>{shippingCost.toFixed(0)} F CFA</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Réduction</span>
          <span>-{discount.toFixed(0)} F CFA</span>
        </div>
      )}
      <Separator />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{total.toFixed(0)} F CFA</span>
      </div>
      
      {estimatedDelivery && (
        <div className="mt-2 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Livraison estimée:</span>
            <Badge variant="outline" className="bg-blue-50">
              {estimatedDelivery}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryDetails;
