
import React from "react";
import OrderSummary from "@/components/payment/OrderSummary";
import ShippingInfoDisplay from "@/components/payment/ShippingInfoDisplay";
import { CartItem } from "@/types/user";

interface OrderSummaryDisplayProps {
  cartItems: CartItem[];
  shippingInfo: any;
  shippingCost: number;
  discount: number;
  total: number;
}

const OrderSummaryDisplay = ({
  cartItems,
  shippingInfo,
  shippingCost,
  discount,
  total
}: OrderSummaryDisplayProps) => {
  return (
    <div>
      <OrderSummary
        cartItems={cartItems}
        shippingCost={shippingCost}
        discount={discount}
        total={total}
      />
      
      <ShippingInfoDisplay shippingInfo={shippingInfo} />
    </div>
  );
};

export default OrderSummaryDisplay;
