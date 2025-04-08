
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderConfirmationHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-4 print:hidden"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Button>
      
      <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-8 flex items-center justify-center">
        <CheckCircle className="text-green-500 h-10 w-10 mr-4" />
        <div>
          <h1 className="text-2xl font-bold text-green-700">Commande confirmée</h1>
          <p className="text-green-600">Merci pour votre achat !</p>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationHeader;
