
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartHeaderProps {
  cartItemCount: number;
}

const CartHeader = ({ cartItemCount }: CartHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-health-dark">Pharmacie en ligne</h1>
      <div className="flex items-center mt-4 md:mt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Panier ({cartItemCount})
        </Button>
      </div>
    </div>
  );
};

export default CartHeader;
