
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { CartItem } from "@/types/user";

interface OrderItemsCardProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: string;
  handlePrint: () => void;
}

const OrderItemsCard = ({
  items,
  subtotal,
  shippingCost,
  discount,
  total,
  handlePrint
}: OrderItemsCardProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Articles ({items.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center py-3 border-b last:border-0">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded">
                <img src={item.product.imageUrl} alt={item.product.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
              </div>
              <div className="text-right font-medium">
                {(item.product.price * item.quantity).toFixed(0)} F CFA
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-2">
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
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{total} F CFA</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="print:hidden">
        <Button 
          variant="outline" 
          onClick={handlePrint}
          className="w-full flex items-center justify-center"
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimer la confirmation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderItemsCard;
