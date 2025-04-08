
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Minus, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/types/user";

interface CartItemsProps {
  cartItems: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartItems = ({ cartItems, updateQuantity, removeFromCart }: CartItemsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles ({cartItems.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex items-center py-4 border-b last:border-0">
            <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded">
              <img src={item.product.imageUrl} alt={item.product.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-sm text-gray-500">{item.product.category}</p>
              {item.product.requiresPrescription && item.prescription && (
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <FileText className="w-3 h-3 mr-1" />
                  Ordonnance fournie
                </div>
              )}
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-10 text-center">{item.quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="w-20 text-right font-medium">
              {(item.product.price * item.quantity).toFixed(2)} €
            </div>
            <Button variant="ghost" size="icon" className="ml-2" onClick={() => removeFromCart(item.product.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CartItems;
