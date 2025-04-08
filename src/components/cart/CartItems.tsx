
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Minus, FileText, ShoppingCart } from "lucide-react";
import { CartItem } from "@/types/user";

interface CartItemsProps {
  cartItems: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartItems = ({ cartItems, updateQuantity, removeFromCart }: CartItemsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50">
        <CardTitle className="flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2 text-health-blue" />
          Articles ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {cartItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Votre panier est vide
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.product.id} className="flex items-center p-4 border-b last:border-0 hover:bg-gray-50 transition-colors">
              <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded">
                <img src={item.product.imageUrl} alt={item.product.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-health-dark">{item.product.name}</h3>
                <p className="text-sm text-gray-500">{item.product.category}</p>
                <p className="text-sm font-medium text-health-blue">
                  {item.product.price.toFixed(0)} F CFA / unité
                </p>
                {item.product.requiresPrescription && item.prescription && (
                  <div className="flex items-center mt-1 text-xs text-green-600">
                    <FileText className="w-3 h-3 mr-1" />
                    Ordonnance fournie
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center mr-4">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-none border-r hover:bg-gray-100" 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-10 text-center">{item.quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-none border-l hover:bg-gray-100" 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {item.quantity > 1 ? "Unités" : "Unité"}
                </span>
              </div>
              <div className="w-24 text-right font-medium">
                {(item.product.price * item.quantity).toFixed(0)} F CFA
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 hover:bg-red-50 hover:text-red-600 transition-colors" 
                onClick={() => removeFromCart(item.product.id)}
                title="Supprimer du panier"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CartItems;
