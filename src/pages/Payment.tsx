
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { usePaymentData } from "@/hooks/usePaymentData";
import PaymentContainer from "@/components/payment/PaymentContainer";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems } = usePaymentData();
  
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  
  return (
    <Layout>
      <PaymentContainer />
    </Layout>
  );
};

export default Payment;
