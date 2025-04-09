
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { OrderInfo } from "./types";

interface OrderInfoBannerProps {
  orderInfo: OrderInfo | null;
}

const OrderInfoBanner = ({ orderInfo }: OrderInfoBannerProps) => {
  if (!orderInfo) return null;
  
  return (
    <Card className="bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-500" />
          <p>
            Vous venez de la commande #{orderInfo.orderNumber} du {new Date(orderInfo.orderDate).toLocaleDateString('fr-FR')}. 
            Sélectionnez un produit pour laisser votre avis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInfoBanner;
