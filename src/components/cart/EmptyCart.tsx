
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface EmptyCartProps {
  error?: string | null;
  onRetry?: () => void;
}

const EmptyCart = ({ error, onRetry }: EmptyCartProps) => {
  const navigate = useNavigate();
  
  if (error) {
    return (
      <Card className="animate-in fade-in-50">
        <CardContent className="p-10 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <p className="text-red-500 mb-6">{error}</p>
          {onRetry && (
            <Button onClick={onRetry} className="mr-2">
              Réessayer
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate("/")}>
            Retour à l'accueil
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="animate-in fade-in-50">
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
