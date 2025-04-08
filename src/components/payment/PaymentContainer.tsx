
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import PaymentSuccessDialog from "@/components/payment/PaymentSuccessDialog";
import PaymentPageHeader from "@/components/payment/PaymentPageHeader";
import NoShippingInfo from "@/components/payment/NoShippingInfo";
import PaymentForm from "@/components/payment/PaymentForm";
import OrderSummaryDisplay from "@/components/payment/OrderSummaryDisplay";
import { usePaymentValidation } from "@/hooks/usePaymentValidation";
import { usePaymentData } from "@/hooks/usePaymentData";
import { usePaymentProcessing } from "@/hooks/usePaymentProcessing";

const PaymentContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useUser();
  const { validatePayment } = usePaymentValidation();
  
  // Get payment data from the custom hook
  const { 
    cartItems, 
    shippingInfo, 
    shippingCost, 
    couponCode, 
    discount, 
    total, 
    subtotal 
  } = usePaymentData();
  
  // Initialize payment processing hooks
  const {
    processPayment,
    isProcessing,
    isSuccessDialogOpen,
    setIsSuccessDialogOpen,
    paymentMethod,
    setPaymentMethod,
  } = usePaymentProcessing(total, cartItems, shippingInfo, subtotal, discount, shippingCost);
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [hasVoucher, setHasVoucher] = useState(false);
  
  // Prefill data if user is logged in
  useEffect(() => {
    if (currentUser?.name && cardHolder === "") {
      setCardHolder(currentUser.name);
    }
  }, [currentUser, cardHolder]);
  
  // Redirect after successful payment
  const handleSuccessClose = () => {
    setIsSuccessDialogOpen(false);
    navigate("/order-confirmation");
  };
  
  // Payment submission handler
  const handlePayButtonClick = () => {
    if (!validatePayment(
      paymentMethod, 
      cardNumber, 
      cardHolder, 
      expiryDate, 
      cvv, 
      insuranceProvider, 
      policyNumber
    )) {
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
  
  // Show shipping info error if no shipping info is available
  if (!shippingInfo) {
    return (
      <div className="max-w-5xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6 text-health-dark">Paiement</h1>
        <NoShippingInfo />
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <PaymentPageHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PaymentForm 
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardHolder={cardHolder}
            setCardHolder={setCardHolder}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            cvv={cvv}
            setCvv={setCvv}
            insuranceProvider={insuranceProvider}
            setInsuranceProvider={setInsuranceProvider}
            policyNumber={policyNumber}
            setPolicyNumber={setPolicyNumber}
            hasVoucher={hasVoucher}
            setHasVoucher={setHasVoucher}
            handlePayButtonClick={handlePayButtonClick}
            isProcessing={isProcessing}
            total={total}
          />
        </div>
        
        <div>
          <OrderSummaryDisplay 
            cartItems={cartItems}
            shippingInfo={shippingInfo}
            shippingCost={shippingCost}
            discount={discount}
            total={total}
          />
        </div>
      </div>
      
      <PaymentSuccessDialog 
        isOpen={isSuccessDialogOpen} 
        onOpenChange={setIsSuccessDialogOpen}
        onClose={handleSuccessClose}
        orderNumber={`ORD-${Date.now().toString().slice(-8)}`}
      />
    </div>
  );
};

export default PaymentContainer;
