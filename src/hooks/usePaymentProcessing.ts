import { useState } from "react";
import { format, addDays } from "date-fns";
import { CartItem } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { OrderStatusType } from "@/types/user/orderTypes";

type PaymentMethod = "card" | "insurance" | "paypal" | "mobile" | "transfer" | "cod";

interface PaymentFormData {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  insuranceProvider?: string;
  policyNumber?: string;
  mobileNumber?: string;
  is3DSecureEnabled?: boolean;
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
  const { toast } = useToast();
  
  const simulate3DSecure = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '9999';
      
      const content = document.createElement('div');
      content.style.backgroundColor = '#fff';
      content.style.padding = '20px';
      content.style.borderRadius = '8px';
      content.style.maxWidth = '400px';
      content.style.width = '90%';
      
      content.innerHTML = `
        <div style="text-align: center;">
          <div style="margin-bottom: 20px;">
            <img src="https://www.mastercard.fr/content/dam/public/mastercardcom/eu/fr/images/illustration/logo-3dsecure-mastercard.png" 
                 alt="3D Secure" style="height: 60px;">
          </div>
          <h3 style="margin-bottom: 20px; font-size: 18px;">Authentification 3D Secure</h3>
          <p style="margin-bottom: 20px;">Veuillez confirmer cette transaction avec le code envoyé à votre téléphone.</p>
          <div style="margin-bottom: 20px;">
            <input type="text" placeholder="Code de sécurité" 
                   style="padding: 8px; width: 100%; border: 1px solid #ddd; border-radius: 4px;">
          </div>
          <div style="display: flex; justify-content: space-between;">
            <button id="cancel-3ds" 
                    style="padding: 8px 16px; background: #f1f1f1; border: none; border-radius: 4px; cursor: pointer;">
              Annuler
            </button>
            <button id="confirm-3ds" 
                    style="padding: 8px 16px; background: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Confirmer
            </button>
          </div>
        </div>
      `;
      
      modal.appendChild(content);
      document.body.appendChild(modal);
      
      const cancelButton = document.getElementById('cancel-3ds');
      const confirmButton = document.getElementById('confirm-3ds');
      
      cancelButton?.addEventListener('click', () => {
        document.body.removeChild(modal);
        resolve(false);
      });
      
      confirmButton?.addEventListener('click', () => {
        document.body.removeChild(modal);
        resolve(true);
      });
    });
  };
  
  const processPayment = async (method: PaymentMethod, formData: PaymentFormData) => {
    setIsProcessing(true);
    
    try {
      if (method === "card" && formData.is3DSecureEnabled) {
        const confirmed = await simulate3DSecure();
        if (!confirmed) {
          toast({
            variant: "destructive",
            title: "Paiement annulé",
            description: "L'authentification 3D Secure a été annulée",
          });
          setIsProcessing(false);
          return;
        }
      }
      
      if (method === "mobile") {
        toast({
          title: "Code envoyé",
          description: `Un code de confirmation a été envoyé à ${formData.mobileNumber}`,
        });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
      const trackingNumber = `TRK${Date.now().toString().slice(-10)}`;
      
      const isExpress = localStorage.getItem("shippingMethod") === "express";
      const deliveryDays = isExpress ? 2 : 5;
      const estimatedDelivery = format(addDays(new Date(), deliveryDays), "dd/MM/yyyy");
      
      const getCarrier = () => {
        const country = shippingInfo?.country || "";
        
        if (isExpress) {
          return "DHL Express";
        } else if (country === "Sénégal") {
          return "Senegal Post";
        } else if (country === "Côte d'Ivoire") {
          return "La Poste de Côte d'Ivoire";
        } else {
          return "Africa Logistics";
        }
      };
      
      const getTrackingUrl = (carrier: string, trackingNumber: string) => {
        if (carrier === "DHL Express") {
          return `https://www.dhl.com/tracking/shipments?tracking-id=${trackingNumber}`;
        } else {
          return `https://tracking.example.com?number=${trackingNumber}&carrier=${encodeURIComponent(carrier)}`;
        }
      };
      
      const carrier = getCarrier();
      const trackingUrl = getTrackingUrl(carrier, trackingNumber);
      
      const getPaymentMethodName = () => {
        switch (method) {
          case "card": return "Carte bancaire";
          case "paypal": return "PayPal";
          case "insurance": return "Assurance santé";
          case "mobile": return "Mobile Money";
          case "transfer": return "Virement bancaire";
          case "cod": return "Paiement à la livraison";
          default: return "Méthode inconnue";
        }
      };
      
      const getInitialStatus = (): OrderStatusType => {
        if (method === 'transfer') return "pending";
        if (method === 'cod') return "confirmed";
        return "processing";
      };
      
      const orderData = {
        orderNumber,
        trackingNumber,
        trackingUrl,
        carrier,
        orderDate: format(new Date(), "dd/MM/yyyy"),
        estimatedDelivery,
        total: total.toFixed(0),
        subtotal: subtotal,
        discount: discount,
        shippingCost: shippingCost,
        items: cartItems,
        shippingInfo: shippingInfo,
        paymentMethod: getPaymentMethodName(),
        lastFourDigits: method === 'card' && formData.cardNumber ? formData.cardNumber.replace(/\s/g, "").slice(-4) : null,
        email: shippingInfo?.email || "",
        status: getInitialStatus()
      };
      
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      
      localStorage.removeItem("cart");
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("shippingMethod");
      localStorage.removeItem("couponCode");
      
      setIsProcessing(false);
      
      if (method === 'transfer') {
        toast({
          title: "Virement bancaire enregistré",
          description: "Votre commande sera confirmée dès réception du paiement",
        });
      }
      
      setIsSuccessDialogOpen(true);
    } catch (error) {
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.",
      });
    }
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
