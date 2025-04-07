
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Box, Truck, Calendar } from "lucide-react";
import Layout from "@/components/Layout";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 3);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto my-10 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-health-dark">Commande confirmée !</h1>
          <p className="text-gray-500 mt-2">
            Merci pour votre achat. Un email de confirmation vous a été envoyé.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Box className="mr-2 h-5 w-5" />
              Détails de la commande
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Numéro de commande</p>
                  <p className="font-medium">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date de commande</p>
                  <p className="font-medium">{today.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Méthode de paiement</p>
                <p className="font-medium">Carte bancaire (•••• 1234)</p>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center mb-4">
                  <Truck className="h-5 w-5 mr-2 text-health-dark" />
                  <h3 className="font-medium">Livraison</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Adresse de livraison</p>
                    <p className="font-medium">Jean Dupont</p>
                    <p className="text-sm">123 Rue de Paris</p>
                    <p className="text-sm">75001 Paris, France</p>
                    <p className="text-sm">+33 6 12 34 56 78</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimation de livraison</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      <p className="font-medium">{deliveryDate.toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Méthode d'expédition</p>
                    <p className="text-sm">Standard (3-5 jours ouvrables)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Suivi de commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full h-8 w-8 bg-green-500 text-white flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="h-full border-l border-green-500 mx-auto mt-2"></div>
                  </div>
                  <div>
                    <h3 className="font-medium">Commande confirmée</h3>
                    <p className="text-sm text-gray-500">{today.toLocaleDateString()} à {today.toLocaleTimeString()}</p>
                    <p className="mt-1 text-sm">Votre commande a été reçue et est en cours de traitement.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full h-8 w-8 bg-gray-200 text-gray-500 flex items-center justify-center">
                      1
                    </div>
                    <div className="h-full border-l border-gray-200 mx-auto mt-2"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Préparation en cours</h3>
                    <p className="text-sm text-gray-500">En attente</p>
                    <p className="mt-1 text-sm text-gray-500">Votre commande est en cours de préparation par notre équipe.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full h-8 w-8 bg-gray-200 text-gray-500 flex items-center justify-center">
                      2
                    </div>
                    <div className="h-full border-l border-gray-200 mx-auto mt-2"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Commande expédiée</h3>
                    <p className="text-sm text-gray-500">En attente</p>
                    <p className="mt-1 text-sm text-gray-500">Votre colis est en route vers votre adresse de livraison.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full h-8 w-8 bg-gray-200 text-gray-500 flex items-center justify-center">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Commande livrée</h3>
                    <p className="text-sm text-gray-500">En attente</p>
                    <p className="mt-1 text-sm text-gray-500">Estimation: {deliveryDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Button onClick={() => navigate("/products")}>
            Continuer vos achats
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
