
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/user";

interface CartSummaryProps {
  cartItems: CartItem[];
  shippingMethod: string;
  setShippingMethod: (value: string) => void;
  couponCode: string;
  setCouponCode: (value: string) => void;
  applyCoupon: () => void;
  nextStep: () => void;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

const CartSummary = ({
  cartItems,
  shippingMethod,
  setShippingMethod,
  couponCode,
  setCouponCode,
  applyCoupon,
  nextStep,
  subtotal,
  shippingCost,
  discount,
  total
}: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif</CardTitle>
      </CardHeader>
      <CardContent>
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

          <div className="pt-4">
            <Label htmlFor="shipping-method">Méthode de livraison</Label>
            <Select value={shippingMethod} onValueChange={setShippingMethod}>
              <SelectTrigger id="shipping-method" className="w-full">
                <SelectValue placeholder="Choisir une méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (3-5 jours) - 3,99 €</SelectItem>
                <SelectItem value="express">Express (1-2 jours) - 7,99 €</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Code promo"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button variant="outline" onClick={applyCoupon}>Appliquer</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={nextStep}>Passer à la livraison</Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
