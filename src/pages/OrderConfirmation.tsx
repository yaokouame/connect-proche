
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import OrderConfirmationHeader from "@/components/orders/OrderConfirmationHeader";
import OrderDetailsCard from "@/components/orders/OrderDetailsCard";
import OrderAddressCards from "@/components/orders/OrderAddressCards";
import OrderItemsCard from "@/components/orders/OrderItemsCard";
import OrderFooter from "@/components/orders/OrderFooter";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<any>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
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
    lastFourDigits
  } = orderData;
  
  const trackingNumber = orderData.trackingNumber || `TRK${orderNumber.slice(-6)}`;
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
          trackingNumber={trackingNumber}
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
    </Layout>
  );
};

export default OrderConfirmation;
