
import React from "react";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import { CartPageState } from "@/hooks/useCartPage";

interface CartContainerProps {
  cartItems: CartPageState["cartItems"];
  shippingMethod: CartPageState["shippingMethod"];
  setShippingMethod: (value: string) => void;
  couponCode: CartPageState["couponCode"];
  setCouponCode: (value: string) => void;
  subtotal: CartPageState["subtotal"];
  shippingCost: CartPageState["shippingCost"];
  discount: CartPageState["discount"];
  total: CartPageState["total"];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: () => void;
  nextStep: () => void;
}

const CartContainer = ({
  cartItems,
  shippingMethod,
  setShippingMethod,
  couponCode,
  setCouponCode,
  subtotal,
  shippingCost,
  discount,
  total,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  nextStep
}: CartContainerProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartItems 
          cartItems={cartItems} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart} 
        />
      </div>

      <div>
        <CartSummary
          cartItems={cartItems}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          applyCoupon={applyCoupon}
          nextStep={nextStep}
          subtotal={subtotal}
          shippingCost={shippingCost}
          discount={discount}
          total={total}
        />
      </div>
    </div>
  );
};

export default CartContainer;
