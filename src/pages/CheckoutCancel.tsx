
import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutCancel = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-lg shadow-md text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Commande annulée</h1>
        <p className="text-gray-600 mb-6">
          Votre commande a été annulée. Aucun paiement n'a été effectué.
        </p>
        <div className="flex flex-col space-y-3">
          <Button asChild className="w-full">
            <Link to="/cart">Revenir au panier</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/products">Continuer vos achats</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutCancel;
