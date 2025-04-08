
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import CardPaymentForm from "@/components/payment/CardPaymentForm";
import InsurancePaymentForm from "@/components/payment/InsurancePaymentForm";
import PaymentProcessingIndicator from "@/components/payment/PaymentProcessingIndicator";

interface PaymentFormProps {
  paymentMethod: "card" | "insurance" | "paypal";
  setPaymentMethod: (method: "card" | "insurance" | "paypal") => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardHolder: string;
  setCardHolder: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  insuranceProvider: string;
  setInsuranceProvider: (value: string) => void;
  policyNumber: string;
  setPolicyNumber: (value: string) => void;
  hasVoucher: boolean;
  setHasVoucher: (value: boolean) => void;
  handlePayButtonClick: () => void;
  isProcessing: boolean;
  total: number;
}

const PaymentForm = ({
  paymentMethod,
  setPaymentMethod,
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  insuranceProvider,
  setInsuranceProvider,
  policyNumber,
  setPolicyNumber,
  hasVoucher,
  setHasVoucher,
  handlePayButtonClick,
  isProcessing,
  total
}: PaymentFormProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Choisissez votre mode de paiement</h2>
      
      <PaymentMethodSelector
        selectedMethod={paymentMethod}
        onMethodChange={setPaymentMethod}
      />
      
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
            `Payer ${total.toFixed(0)} F CFA`
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
