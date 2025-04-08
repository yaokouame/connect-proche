
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import ShippingMethodSelector from "./ShippingMethodSelector";
import PromoCodeInput from "./PromoCodeInput";
import OrderSummaryDetails from "./OrderSummaryDetails";
import { CalendarCheck, LogIn, UserPlus } from "lucide-react";

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
  const navigate = useNavigate();
  const { currentUser } = useUser();
  
  // Calculate estimated delivery date based on shipping method
  const getEstimatedDelivery = () => {
    const today = new Date();
    if (shippingMethod === "express") {
      // 1-2 days for express shipping
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 2);
      return deliveryDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    } else {
      // 3-5 days for standard shipping
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 5);
      return deliveryDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    }
  };

  const handleNextStep = () => {
    if (!currentUser) {
      // User is not logged in, redirect to login page with fromCart flag
      navigate('/login?fromCart=true');
    } else {
      // User is logged in, proceed to next step
      nextStep();
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50">
        <CardTitle>Récapitulatif</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <OrderSummaryDetails 
          subtotal={subtotal}
          shippingCost={shippingCost}
          discount={discount}
          total={total}
          estimatedDelivery={getEstimatedDelivery()}
        />
        
        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100 flex items-center">
          <CalendarCheck className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-sm text-green-700">
            Livraison estimée: <strong>{getEstimatedDelivery()}</strong>
          </span>
        </div>

        <ShippingMethodSelector 
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
        />

        <div className="mt-4">
          <PromoCodeInput
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            applyCoupon={applyCoupon}
            discount={discount}
          />
        </div>
        
        {!currentUser && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
            <h4 className="text-sm font-medium text-blue-700 mb-2">Connexion requise</h4>
            <p className="text-xs text-blue-600 mb-2">
              Connectez-vous pour continuer ou commandez en tant qu'invité.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex-1"
                onClick={() => navigate('/login?fromCart=true')}
              >
                <LogIn className="h-3 w-3 mr-1" />
                Se connecter
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex-1"
                onClick={() => navigate('/register')}
              >
                <UserPlus className="h-3 w-3 mr-1" />
                S'inscrire
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button 
          className="w-full" 
          onClick={handleNextStep}
          disabled={cartItems.length === 0}
        >
          {currentUser ? "Passer à la livraison" : "Connexion / Continuer en invité"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
