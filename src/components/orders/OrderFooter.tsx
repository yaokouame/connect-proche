
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OrderFooterProps {
  email: string;
}

const OrderFooter = ({ email }: OrderFooterProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center space-y-4 print:hidden">
      <Button onClick={() => navigate("/products")}>
        Continuer mes achats
      </Button>
      <p className="text-sm text-gray-500">
        Un email de confirmation a été envoyé à {email}
      </p>
    </div>
  );
};

export default OrderFooter;
