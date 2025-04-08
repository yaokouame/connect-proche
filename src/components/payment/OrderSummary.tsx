
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/user";

interface OrderSummaryProps {
  cartItems: CartItem[];
  shippingCost: number;
  discount: number;
  total: number;
}

const OrderSummary = ({ 
  cartItems,
  shippingCost,
  discount,
  total 
}: OrderSummaryProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50 pb-3">
        <CardTitle className="text-health-dark">Récapitulatif de la commande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex justify-between pb-2">
            <div>
              <p className="font-medium text-health-dark">{item.product.name}</p>
              <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
            </div>
            <p className="font-medium">{(item.product.price * item.quantity).toFixed(0)} F CFA</p>
          </div>
        ))}
        
        <Separator className="my-2" />
        
        <div className="flex justify-between">
          <span className="text-gray-600">Sous-total</span>
          <span className="font-medium">
            {cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(0)} F CFA
          </span>
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
        
        <div className="flex justify-between font-bold text-lg bg-gray-50 p-3 rounded-md">
          <span>Total</span>
          <span>{total.toFixed(0)} F CFA</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
