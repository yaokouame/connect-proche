
import { useState, useEffect } from "react";
import { CartItem } from "@/types/user";

interface PaymentData {
  cartItems: CartItem[];
  shippingInfo: any | null;
  shippingCost: number;
  couponCode: string;
  discount: number;
  total: number;
  subtotal: number;
}

export const usePaymentData = (): PaymentData => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [shippingCost, setShippingCost] = useState(3.99);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  
  // Load data from localStorage
  useEffect(() => {
    // Retrieve cart data
    const savedCart = localStorage.getItem("cart");
    const savedShippingInfo = localStorage.getItem("shippingInfo");
    const savedShippingMethod = localStorage.getItem("shippingMethod");
    const savedCouponCode = localStorage.getItem("couponCode");
    
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      setCartItems(cart);
    }
    
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    }
    
    if (savedShippingMethod) {
      setShippingCost(savedShippingMethod === "express" ? 7.99 : 3.99);
    }
    
    if (savedCouponCode && savedCouponCode === "SANTE10") {
      setCouponCode(savedCouponCode);
      
      // Calculate discount
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const calculatedSubtotal = cart.reduce(
          (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
          0
        );
        setDiscount(calculatedSubtotal * 0.1);
      }
    }
  }, []);
  
  // Calculate totals whenever dependencies change
  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
    setTotal(calculatedSubtotal + shippingCost - discount);
  }, [cartItems, shippingCost, discount]);
  
  return {
    cartItems,
    shippingInfo,
    shippingCost,
    couponCode,
    discount,
    total,
    subtotal
  };
};
