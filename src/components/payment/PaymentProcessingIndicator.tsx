
import React from "react";
import { CreditCard } from "lucide-react";

const PaymentProcessingIndicator = () => {
  return (
    <div className="flex items-center mt-6">
      <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
      <p className="text-sm text-gray-500">
        Paiement sécurisé - Toutes vos informations sont chiffrées
      </p>
    </div>
  );
};

export default PaymentProcessingIndicator;
