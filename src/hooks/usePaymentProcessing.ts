
import { useState } from "react";
import { format, addDays } from "date-fns";
import { CartItem } from "@/types/user";

type PaymentMethod = "card" | "insurance" | "paypal";

interface PaymentFormData {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  insuranceProvider?: string;
  policyNumber?: string;
}

interface PaymentProcessingHook {
  processPayment: (method: PaymentMethod, formData: PaymentFormData) => void;
  isProcessing: boolean;
  isSuccessDialogOpen: boolean;
  setIsSuccessDialogOpen: (open: boolean) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}

export const usePaymentProcessing = (
  total: number,
  cartItems: CartItem[],
  shippingInfo: any,
  subtotal: number,
  discount: number,
  shippingCost: number
): PaymentProcessingHook => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  
  const processPayment = (method: PaymentMethod, formData: PaymentFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Generate order number
      const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
      const trackingNumber = `TRK${Date.now().toString().slice(-10)}`;
      
      // Calculate estimated delivery based on shipping method
      const isExpress = localStorage.getItem("shippingMethod") === "express";
      const deliveryDays = isExpress ? 2 : 5;
      const estimatedDelivery = format(addDays(new Date(), deliveryDays), "dd/MM/yyyy");
      
      // Prepare order data for summary
      const orderData = {
        orderNumber,
        trackingNumber,
        orderDate: format(new Date(), "dd/MM/yyyy"),
        estimatedDelivery,
        total: total.toFixed(0),
        subtotal: subtotal,
        discount: discount,
        shippingCost: shippingCost,
        items: cartItems,
        shippingInfo: shippingInfo,
        paymentMethod: method === "card" 
          ? "Carte bancaire" 
          : method === "insurance" 
            ? "Assurance santé" 
            : "PayPal",
        lastFourDigits: formData.cardNumber ? formData.cardNumber.replace(/\s/g, "").slice(-4) : null,
        email: shippingInfo?.email || "",
        status: "confirmed"
      };
      
      // Save order data to localStorage
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      
      // Clear cart and related information
      localStorage.removeItem("cart");
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("shippingMethod");
      localStorage.removeItem("couponCode");
      
      setIsProcessing(false);
      
      // Show success dialog
      setIsSuccessDialogOpen(true);
    }, 2000);
  };
  
  return {
    processPayment,
    isProcessing,
    isSuccessDialogOpen,
    setIsSuccessDialogOpen,
    paymentMethod,
    setPaymentMethod
  };
};
