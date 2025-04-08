
import React from "react";

interface CheckoutStepsProps {
  step: "cart" | "shipping" | "payment";
}

const CheckoutSteps = ({ step }: CheckoutStepsProps) => {
  return (
    <div className="flex justify-between mb-8">
      <div className={`flex flex-col items-center ${step === "cart" ? "text-primary" : "text-gray-400"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step === "cart" ? "bg-primary text-white" : "bg-gray-200"}`}>
          1
        </div>
        <span className="text-sm">Panier</span>
      </div>
      <div className="flex-1 border-t border-gray-200 relative top-4 mx-4"></div>
      <div className={`flex flex-col items-center ${step === "shipping" ? "text-primary" : "text-gray-400"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step === "shipping" ? "bg-primary text-white" : "bg-gray-200"}`}>
          2
        </div>
        <span className="text-sm">Livraison</span>
      </div>
      <div className="flex-1 border-t border-gray-200 relative top-4 mx-4"></div>
      <div className="flex flex-col items-center text-gray-400">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 bg-gray-200">
          3
        </div>
        <span className="text-sm">Paiement</span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
