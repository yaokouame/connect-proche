
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import OrderConfirmationHeader from "@/components/orders/OrderConfirmationHeader";
import OrderDetailsCard from "@/components/orders/OrderDetailsCard";
import OrderAddressCards from "@/components/orders/OrderAddressCards";
import OrderItemsCard from "@/components/orders/OrderItemsCard";
import OrderFooter from "@/components/orders/OrderFooter";
import { OrderStatusType } from "@/types/user/orderTypes";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  
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

  const handleSubmitReturn = () => {
    if (!returnReason.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez indiquer la raison du retour",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande de retour envoyée",
      description: "Nous avons bien reçu votre demande de retour et la traiterons dans les plus brefs délais",
    });
    
    setShowReturnDialog(false);
    setReturnReason("");
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

  const { 
    orderNumber, 
    orderDate, 
    total, 
    shippingInfo, 
    items, 
    paymentMethod, 
    estimatedDelivery,
    subtotal = 0,
    shippingCost = 0,
    discount = 0,
    lastFourDigits,
    status = "confirmed",
    trackingNumber,
    trackingUrl,
    carrier
  } = orderData;
  
  const generatedTrackingNumber = trackingNumber || `TRK${orderNumber.slice(-6)}`;
  const email = orderData.email || shippingInfo.email || "votre adresse email";

  return (
    <Layout>
      <div className="max-w-3xl mx-auto my-10 p-4">
        <OrderConfirmationHeader />
        
        <OrderDetailsCard 
          orderNumber={orderNumber}
          orderDate={orderDate}
          paymentMethod={paymentMethod}
          estimatedDelivery={estimatedDelivery}
          total={total}
          trackingNumber={generatedTrackingNumber}
          trackingUrl={trackingUrl}
          carrier={carrier}
          orderStatus={status as OrderStatusType}
          notificationsEnabled={notificationsEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
        />
        
        <OrderAddressCards 
          shippingInfo={shippingInfo}
          paymentMethod={paymentMethod}
          lastFourDigits={lastFourDigits}
        />
        
        <OrderItemsCard 
          items={items}
          subtotal={subtotal}
          shippingCost={shippingCost}
          discount={discount}
          total={total}
          handlePrint={handlePrint}
        />
        
        <OrderFooter email={email} />
      </div>

      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demande de retour</DialogTitle>
            <DialogDescription>
              Veuillez nous indiquer la raison de votre retour
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Raison du retour</label>
              <Textarea
                placeholder="Expliquez pourquoi vous souhaitez retourner ce produit..."
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReturnDialog(false)}>Annuler</Button>
            <Button onClick={handleSubmitReturn}>Envoyer la demande</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default OrderConfirmation;
