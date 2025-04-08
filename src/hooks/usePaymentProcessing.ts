
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
  validatePayment: (
    method: PaymentMethod,
    cardNumber: string,
    cardHolder: string,
    expiryDate: string,
    cvv: string,
    insuranceProvider: string,
    policyNumber: string,
    toast: any
  ) => boolean;
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
  
  const validatePayment = (
    method: PaymentMethod,
    cardNumber: string,
    cardHolder: string,
    expiryDate: string,
    cvv: string,
    insuranceProvider: string,
    policyNumber: string,
    toast: any
  ): boolean => {
    if (method === "card") {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length < 16) {
        toast({
          variant: "destructive",
          title: "Numéro de carte invalide",
          description: "Veuillez saisir un numéro de carte valide",
        });
        return false;
      }
      
      if (!cardHolder.trim()) {
        toast({
          variant: "destructive",
          title: "Titulaire de la carte manquant",
          description: "Veuillez saisir le nom du titulaire de la carte",
        });
        return false;
      }
      
      if (!expiryDate.trim() || !expiryDate.includes("/") || expiryDate.length < 5) {
        toast({
          variant: "destructive",
          title: "Date d'expiration invalide",
          description: "Veuillez saisir une date d'expiration valide (MM/YY)",
        });
        return false;
      }
      
      if (!cvv.trim() || cvv.length < 3) {
        toast({
          variant: "destructive",
          title: "CVV invalide",
          description: "Veuillez saisir un code de sécurité valide",
        });
        return false;
      }
    } else if (method === "insurance") {
      if (!insuranceProvider) {
        toast({
          variant: "destructive",
          title: "Assureur manquant",
          description: "Veuillez sélectionner votre assureur",
        });
        return false;
      }
      
      if (!policyNumber.trim()) {
        toast({
          variant: "destructive",
          title: "Numéro de police manquant",
          description: "Veuillez saisir votre numéro de police d'assurance",
        });
        return false;
      }
    }
    
    return true;
  };
  
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
    setPaymentMethod,
    validatePayment
  };
};
