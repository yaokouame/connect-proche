
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NoShippingInfo = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
      <p className="text-amber-800 mb-4">
        Vous devez d'abord renseigner vos informations de livraison
      </p>
      <Button onClick={() => navigate("/cart")}>
        Retour au panier
      </Button>
    </div>
  );
};

export default NoShippingInfo;
