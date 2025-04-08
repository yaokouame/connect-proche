
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TruckIcon, Clock, ShoppingBag, Home } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  
  useEffect(() => {
    // Générer un numéro de commande et une date de livraison estimée
    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-8);
      return `ORD-${timestamp}`;
    };
    
    const generateEstimatedDelivery = () => {
      const today = new Date();
      const deliveryDate = new Date(today);
      // Ajouter 3-5 jours ouvrables
      deliveryDate.setDate(today.getDate() + 3 + Math.floor(Math.random() * 3));
      
      // Formater la date (ex: "15 avril 2025")
      const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      };
      return deliveryDate.toLocaleDateString('fr-FR', options);
    };
    
    setOrderNumber(generateOrderNumber());
    setEstimatedDelivery(generateEstimatedDelivery());
  }, []);
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 p-4">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-bold">Commande confirmée !</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                Merci pour votre achat. Nous avons bien reçu votre commande.
              </p>
              <p>
                Un e-mail de confirmation a été envoyé à l'adresse associée à votre compte.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Numéro de commande</h3>
                  <p className="text-gray-600">{orderNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Date estimée de livraison</h3>
                  <p className="text-gray-600">{estimatedDelivery}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <TruckIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">État de la commande</h3>
                  <p className="text-gray-600">En cours de traitement</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 pt-6">
              <Button onClick={() => navigate("/products")}>
                Continuer mes achats
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
