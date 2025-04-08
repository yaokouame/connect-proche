
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
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif de la commande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
            </div>
            <p className="font-medium">{(item.product.price * item.quantity).toFixed(0)} F CFA</p>
          </div>
        ))}
        
        <Separator />
        
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>
            {cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(0)} F CFA
          </span>
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
        
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{total.toFixed(0)} F CFA</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
