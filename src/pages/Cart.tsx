
import React from "react";
import Layout from "@/components/Layout";
import EmptyCart from "@/components/cart/EmptyCart";
import CartContainer from "@/components/cart/CartContainer";
import CheckoutSteps from "@/components/cart/CheckoutSteps";
import ShippingStepContent from "@/components/cart/ShippingStepContent";
import { useCartPage } from "@/hooks/useCartPage";

const Cart = () => {
  const {
    cartItems,
    shippingMethod,
    setShippingMethod,
    couponCode,
    setCouponCode,
    step,
    shippingInfo,
    subtotal,
    shippingCost,
    discount,
    total,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    nextStep,
    prevStep,
    handleShippingInfoChange,
    setCountry
  } = useCartPage();

  if (cartItems.length === 0 && step === "cart") {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto mt-10 p-8">
          <h1 className="text-3xl font-bold mb-8 text-health-dark">Votre Panier</h1>
          <EmptyCart />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold my-8 text-health-dark">
          {step === "cart" ? "Votre Panier" : "Livraison"}
        </h1>

        {/* Checkout process steps */}
        <CheckoutSteps step={step} />

        {/* Display content based on current step */}
        {step === "cart" && (
          <CartContainer 
            cartItems={cartItems}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            subtotal={subtotal}
            shippingCost={shippingCost}
            discount={discount}
            total={total}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            applyCoupon={applyCoupon}
            nextStep={nextStep}
          />
        )}

        {step === "shipping" && (
          <ShippingStepContent
            cartItems={cartItems}
            shippingInfo={shippingInfo}
            handleShippingInfoChange={handleShippingInfoChange}
            setCountry={setCountry}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            total={total}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
      </div>
    </Layout>
  );
};

export default Cart;
