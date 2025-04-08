
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
        <span className="text-gray-600">Sous-total</span>
        <span className="font-medium">{subtotal.toFixed(0)} F CFA</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Livraison</span>
        <span className="font-medium">{shippingCost.toFixed(0)} F CFA</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Réduction</span>
          <span>-{discount.toFixed(0)} F CFA</span>
        </div>
      )}
      <Separator className="my-2" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{total.toFixed(0)} F CFA</span>
      </div>
      
      {estimatedDelivery && (
        <div className="mt-4 pt-2 bg-blue-50 p-3 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Livraison estimée:</span>
            <Badge variant="outline" className="bg-white">
              {estimatedDelivery}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryDetails;
