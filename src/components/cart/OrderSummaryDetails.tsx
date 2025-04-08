
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
      
      {estimatedDelivery && (
        <div className="mt-2 p-2 bg-green-50 rounded-md border border-green-100 flex items-center">
          <CalendarCheck className="h-4 w-4 text-green-600 mr-2" />
          <span className="text-sm text-green-700">
            Livraison estimée: <strong>{estimatedDelivery}</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryDetails;
