
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Bell, RefreshCw, MessageSquare, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import OrderStatus from "@/components/orders/OrderStatus";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface OrderDetailsCardProps {
  orderNumber: string;
  orderDate: string;
  paymentMethod: string;
  estimatedDelivery: string;
  total: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  orderStatus: "confirmed" | "processing" | "shipped" | "delivered" | "delayed";
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const OrderDetailsCard = ({
  orderNumber,
  orderDate,
  paymentMethod,
  estimatedDelivery,
  total,
  trackingNumber,
  trackingUrl,
  carrier,
  orderStatus = "confirmed",
  notificationsEnabled,
  setNotificationsEnabled
}: OrderDetailsCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleTrackingNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? "Notifications désactivées" : "Notifications activées",
      description: notificationsEnabled 
        ? "Vous ne recevrez plus de mises à jour sur cette commande" 
        : "Vous recevrez des mises à jour sur le statut de votre commande",
    });
  };
  
  const handleViewOnMap = () => {
    toast({
      title: "Carte de livraison",
      description: "Fonctionnalité de carte en cours de développement",
    });
  };

  const handleRequestReturn = () => {
    toast({
      title: "Demande de retour",
      description: "Nous avons enregistré votre demande de retour pour cette commande",
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Service client",
      description: "Un agent vous contactera bientôt concernant cette commande",
    });
  };

  const handleLeaveReview = () => {
    // Store the products from this order in localStorage for easy access in the Reviews page
    const orderInfo = {
      orderNumber,
      orderDate,
      from: "order-confirmation"
    };
    localStorage.setItem("reviewOrderInfo", JSON.stringify(orderInfo));
    navigate("/reviews");
  };
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Détails de la commande</CardTitle>
        <CardDescription>Commande #{orderNumber}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <OrderStatus 
          currentStatus={orderStatus}
          estimatedDelivery={estimatedDelivery}
          trackingNumber={trackingNumber}
          trackingUrl={trackingUrl}
          carrier={carrier}
        />
        
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
            <p className="font-bold">{total} F CFA</p>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col space-y-2 print:hidden">
          <div className="flex items-center space-x-2">
            <Switch 
              id="notifications" 
              checked={notificationsEnabled}
              onCheckedChange={handleTrackingNotifications}
            />
            <Label htmlFor="notifications" className="cursor-pointer">
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Recevoir des notifications de suivi
              </div>
            </Label>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2" 
            onClick={handleViewOnMap}
          >
            <Map className="h-4 w-4 mr-2" />
            Voir le statut de livraison sur la carte
          </Button>

          {orderStatus === "delivered" && (
            <>
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={handleRequestReturn}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Demander un retour
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={handleLeaveReview}
              >
                <Star className="h-4 w-4 mr-2" />
                Laisser un avis
              </Button>
            </>
          )}

          <Button 
            variant="outline" 
            className="w-full mt-2" 
            onClick={handleContactSupport}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Contacter le service client
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetailsCard;
