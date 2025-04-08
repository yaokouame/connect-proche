
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { CartItem } from "@/types/user";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, Check, Loader2 } from "lucide-react";
import { format } from "date-fns";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import CardPaymentForm from "@/components/payment/CardPaymentForm";
import InsurancePaymentForm from "@/components/payment/InsurancePaymentForm";
import OrderSummary from "@/components/payment/OrderSummary";
import ShippingInfoDisplay from "@/components/payment/ShippingInfoDisplay";
import PaymentProcessingIndicator from "@/components/payment/PaymentProcessingIndicator";
import PaymentSuccessDialog from "@/components/payment/PaymentSuccessDialog";
import { usePaymentData } from "@/hooks/usePaymentData";
import { usePaymentProcessing } from "@/hooks/usePaymentProcessing";

type PaymentMethod = "card" | "insurance" | "paypal";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useUser();
  
  // Use custom hooks for payment data and processing
  const { 
    cartItems, 
    shippingInfo, 
    shippingCost, 
    couponCode, 
    discount, 
    total, 
    subtotal 
  } = usePaymentData();
  
  const {
    processPayment,
    isProcessing,
    isSuccessDialogOpen,
    setIsSuccessDialogOpen,
    paymentMethod,
    setPaymentMethod,
    validatePayment,
  } = usePaymentProcessing(total, cartItems, shippingInfo, subtotal, discount, shippingCost);
  
  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Insurance form state
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [hasVoucher, setHasVoucher] = useState(false);
  
  // Redirect to cart if no shipping info is available
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  
  // Auto-fill cardholder name from user data
  useEffect(() => {
    if (currentUser?.name && cardHolder === "") {
      setCardHolder(currentUser.name);
    }
  }, [currentUser, cardHolder]);
  
  const handleSuccessClose = () => {
    setIsSuccessDialogOpen(false);
    navigate("/order-confirmation");
  };
  
  const handlePayButtonClick = () => {
    if (!validatePayment(paymentMethod, cardNumber, cardHolder, expiryDate, cvv, insuranceProvider, policyNumber, toast)) {
      return;
    }
    
    processPayment(
      paymentMethod, 
      {
        cardNumber,
        cardHolder,
        expiryDate,
        cvv,
        insuranceProvider,
        policyNumber
      }
    );
  };
  
  if (!shippingInfo) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto mt-8 p-4">
          <h1 className="text-3xl font-bold mb-6 text-health-dark">Paiement</h1>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
            <p className="text-amber-800 mb-4">
              Vous devez d'abord renseigner vos informations de livraison
            </p>
            <Button onClick={() => navigate("/cart")}>
              Retour au panier
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-8 p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/cart")}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour au panier
        </Button>
        
        <h1 className="text-3xl font-bold mb-6 text-health-dark">Paiement</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Choisissez votre mode de paiement</h2>
            
            {/* Payment method selector */}
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
            
            {/* Card payment form */}
            {paymentMethod === "card" && (
              <CardPaymentForm
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardHolder={cardHolder}
                setCardHolder={setCardHolder}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                cvv={cvv}
                setCvv={setCvv}
              />
            )}
            
            {/* Insurance payment form */}
            {paymentMethod === "insurance" && (
              <InsurancePaymentForm
                insuranceProvider={insuranceProvider}
                setInsuranceProvider={setInsuranceProvider}
                policyNumber={policyNumber}
                setPolicyNumber={setPolicyNumber}
                hasVoucher={hasVoucher}
                setHasVoucher={setHasVoucher}
              />
            )}
            
            {/* PayPal payment option */}
            {paymentMethod === "paypal" && (
              <div className="p-4 border rounded-lg">
                <p className="text-center mb-4">
                  Vous serez redirigé vers PayPal pour compléter votre paiement
                </p>
                <div className="flex justify-center">
                  <img 
                    src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/44_Yellow_AcceptanceMark_Pill_Button.png" 
                    alt="PayPal"
                    className="h-12"
                  />
                </div>
              </div>
            )}
            
            <PaymentProcessingIndicator />
            
            <div className="mt-6">
              <Button 
                onClick={handlePayButtonClick} 
                className="w-full py-6 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  `Payer ${total.toFixed(2)} €`
                )}
              </Button>
            </div>
          </div>
          
          <div>
            {/* Order summary */}
            <OrderSummary
              cartItems={cartItems}
              shippingCost={shippingCost}
              discount={discount}
              total={total}
            />
            
            {/* Shipping information */}
            <ShippingInfoDisplay shippingInfo={shippingInfo} />
          </div>
        </div>
      </div>
      
      {/* Success dialog */}
      <PaymentSuccessDialog 
        isOpen={isSuccessDialogOpen} 
        onOpenChange={setIsSuccessDialogOpen}
        onClose={handleSuccessClose}
        orderNumber={`ORD-${Date.now().toString().slice(-8)}`}
      />
    </Layout>
  );
};

export default Payment;
