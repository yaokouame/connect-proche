
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent className="p-10 text-center">
        <p className="text-gray-500 mb-6">Votre panier est vide</p>
        <Button onClick={() => navigate("/products")}>
          Parcourir les produits
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyCart;
