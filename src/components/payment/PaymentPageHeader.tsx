
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentPageHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => navigate("/cart")}
        className="mb-4"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Retour au panier
      </Button>
      
      <h1 className="text-3xl font-bold mb-6 text-health-dark">Paiement</h1>
    </>
  );
};

export default PaymentPageHeader;
