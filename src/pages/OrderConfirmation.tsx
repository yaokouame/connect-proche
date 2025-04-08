import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Printer, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import OrderStatus from "@/components/orders/OrderStatus";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<any>(null);
  
  useEffect(() => {
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
    } else {
      const savedOrderData = localStorage.getItem("latestOrder");
      if (savedOrderData) {
        setOrderData(JSON.parse(savedOrderData));
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les détails de votre commande",
          variant: "destructive",
        });
        setTimeout(() => navigate("/"), 3000);
      }
    }
  }, [location.state, navigate, toast]);

  const handlePrint = () => {
    window.print();
  };

  if (!orderData) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto mt-10 p-4">
          <h1 className="text-2xl font-bold mb-4">Chargement de votre commande...</h1>
        </div>
      </Layout>
    );
  }

  const { orderNumber, orderDate, total, shippingInfo, items, paymentMethod, estimatedDelivery } = orderData;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto my-10 p-4">
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
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Détails de la commande</CardTitle>
            <CardDescription>Commande #{orderNumber}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <OrderStatus currentStatus="confirmed" />
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm text-gray-500">Date de commande</p>
                <p className="font-medium">{orderDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Paiement</p>
                <p className="font-medium">{paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Livraison estimée</p>
                <p className="font-medium">{estimatedDelivery}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-bold">{total} €</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Adresse de livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{shippingInfo.fullName}</p>
              <p>{shippingInfo.streetAddress}</p>
              <p>{shippingInfo.postalCode} {shippingInfo.city}</p>
              <p>{shippingInfo.country}</p>
              <p className="mt-2 text-gray-500">{shippingInfo.phone}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Méthode de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{paymentMethod}</p>
              {paymentMethod === "Carte bancaire" && (
                <p className="text-gray-500">**** **** **** {orderData.lastFourDigits || "1234"}</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Articles ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item: any, index: number) => (
                <div key={index} className="flex items-center py-3 border-b last:border-0">
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded">
                    <img src={item.product.imageUrl} alt={item.product.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right font-medium">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{(orderData.subtotal || 0).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{(orderData.shippingCost || 0).toFixed(2)} €</span>
              </div>
              {(orderData.discount || 0) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Réduction</span>
                  <span>-{(orderData.discount || 0).toFixed(2)} €</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{total} €</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="print:hidden">
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="w-full flex items-center justify-center"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer la confirmation
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center space-y-4 print:hidden">
          <Button onClick={() => navigate("/products")}>
            Continuer mes achats
          </Button>
          <p className="text-sm text-gray-500">
            Un email de confirmation a été envoyé à {orderData.email || shippingInfo.email || "votre adresse email"}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
