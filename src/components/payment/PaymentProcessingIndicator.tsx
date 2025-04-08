
import React from "react";
import { CreditCard, Shield, Smartphone, BanknoteIcon, Truck } from "lucide-react";

interface PaymentProcessingIndicatorProps {
  paymentMethod: string;
}

const PaymentProcessingIndicator = ({ paymentMethod }: PaymentProcessingIndicatorProps) => {
  const getSecurityMessage = () => {
    switch(paymentMethod) {
      case "card":
        return "Paiement sécurisé - Toutes vos informations sont chiffrées";
      case "paypal":
        return "Transaction sécurisée par PayPal - Aucune information bancaire n'est partagée";
      case "mobile":
        return "Transaction sécurisée via votre opérateur mobile";
      case "transfer":
        return "Virement bancaire sécurisé par votre banque";
      case "cod":
        return "Paiement sécurisé à la livraison";
      default:
        return "Paiement sécurisé - Toutes vos informations sont chiffrées";
    }
  };
  
  const getIcon = () => {
    switch(paymentMethod) {
      case "card":
        return <CreditCard className="h-5 w-5 text-gray-500 mr-2" />;
      case "paypal":
      case "insurance":
        return <Shield className="h-5 w-5 text-gray-500 mr-2" />;
      case "mobile":
        return <Smartphone className="h-5 w-5 text-gray-500 mr-2" />;
      case "transfer":
        return <BanknoteIcon className="h-5 w-5 text-gray-500 mr-2" />;
      case "cod":
        return <Truck className="h-5 w-5 text-gray-500 mr-2" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500 mr-2" />;
    }
  };
  
  return (
    <div className="flex items-center mt-6">
      {getIcon()}
      <p className="text-sm text-gray-500">
        {getSecurityMessage()}
      </p>
    </div>
  );
};

export default PaymentProcessingIndicator;
