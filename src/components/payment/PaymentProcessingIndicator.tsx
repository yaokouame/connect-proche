
import React from "react";
import { CreditCard, Shield, Smartphone, BanknoteIcon, Truck, LockIcon } from "lucide-react";

interface PaymentProcessingIndicatorProps {
  paymentMethod: string;
}

const PaymentProcessingIndicator = ({ paymentMethod }: PaymentProcessingIndicatorProps) => {
  const getSecurityMessage = () => {
    switch(paymentMethod) {
      case "card":
        return "Paiement sécurisé - Toutes vos informations bancaires sont chiffrées";
      case "paypal":
        return "Transaction sécurisée par PayPal - Aucune information bancaire n'est partagée";
      case "mobile":
        return "Transaction sécurisée via votre opérateur mobile - Authentification à deux facteurs";
      case "transfer":
        return "Virement bancaire sécurisé par votre banque - Transaction tracée";
      case "cod":
        return "Paiement sécurisé à la livraison - Remise contre signature";
      case "insurance":
        return "Paiement sécurisé via votre assurance - Authentification requise";
      default:
        return "Paiement sécurisé - Toutes vos informations sont chiffrées";
    }
  };
  
  const getIcon = () => {
    switch(paymentMethod) {
      case "card":
        return <CreditCard className="h-5 w-5 text-green-600 mr-2" />;
      case "paypal":
        return <Shield className="h-5 w-5 text-blue-600 mr-2" />;
      case "insurance":
        return <Shield className="h-5 w-5 text-blue-600 mr-2" />;
      case "mobile":
        return <Smartphone className="h-5 w-5 text-purple-600 mr-2" />;
      case "transfer":
        return <BanknoteIcon className="h-5 w-5 text-amber-600 mr-2" />;
      case "cod":
        return <Truck className="h-5 w-5 text-gray-600 mr-2" />;
      default:
        return <LockIcon className="h-5 w-5 text-green-600 mr-2" />;
    }
  };
  
  return (
    <div className="flex items-center mt-6 bg-gray-50 p-3 rounded-md border border-gray-100">
      {getIcon()}
      <p className="text-sm text-gray-600">
        {getSecurityMessage()}
      </p>
    </div>
  );
};

export default PaymentProcessingIndicator;
