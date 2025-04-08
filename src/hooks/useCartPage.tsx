
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/types/user";
import { useUser } from "@/contexts/UserContext";

export interface ShippingInfo {
  fullName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CartPageState {
  cartItems: CartItem[];
  shippingMethod: string;
  couponCode: string;
  step: "cart" | "shipping" | "payment";
  shippingInfo: ShippingInfo;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
}

export const useCartPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useUser();
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [shippingMethod, setShippingMethod] = useState<string>(() => {
    const savedMethod = localStorage.getItem("shippingMethod");
    return savedMethod || "standard";
  });
  
  const [couponCode, setCouponCode] = useState(() => {
    const savedCoupon = localStorage.getItem("couponCode");
    return savedCoupon || "";
  });
  
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser?.name || "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "Sénégal",
    phone: "",
  });

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const shippingCost = shippingMethod === "express" ? 7999 : 3999;
  const discount = couponCode === "SANTE10" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost - discount;

  // Update cart item quantity
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Afficher toast de confirmation pour la mise à jour
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
      toast({
        title: "Quantité mise à jour",
        description: `${item.product.name}: ${newQuantity} ${newQuantity > 1 ? 'unités' : 'unité'}`,
      });
    }
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    const itemToRemove = cartItems.find(item => item.product.id === productId);
    const updatedCart = cartItems.filter((item) => item.product.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast({
      title: "Produit retiré",
      description: itemToRemove ? `${itemToRemove.product.name} a été retiré de votre panier` : "Le produit a été retiré de votre panier",
    });
  };

  // Apply coupon code
  const applyCoupon = () => {
    if (couponCode === "SANTE10") {
      localStorage.setItem("couponCode", couponCode);
      const discountAmount = Math.round(subtotal * 0.1);
      toast({
        title: "Code promo appliqué",
        description: `10% de réduction sur votre commande (-${discountAmount} F CFA)`,
        variant: "success",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Code promo invalide",
        description: "Ce code promo n'existe pas ou a expiré",
      });
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (step === "cart") {
      if (cartItems.length === 0) {
        toast({
          variant: "destructive",
          title: "Panier vide",
          description: "Veuillez ajouter des produits à votre panier avant de continuer",
        });
        return;
      }
      setStep("shipping");
    } else if (step === "shipping") {
      // Verify all shipping fields are filled
      const { fullName, streetAddress, city, postalCode, phone } = shippingInfo;
      if (!fullName || !streetAddress || !city || !postalCode || !phone) {
        toast({
          variant: "destructive",
          title: "Informations incomplètes",
          description: "Veuillez remplir tous les champs obligatoires",
        });
        return;
      }
      
      // Save shipping info
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
      localStorage.setItem("shippingMethod", shippingMethod);
      
      // Redirect to payment page
      navigate("/payment");
    }
  };

  // Go back to previous step
  const prevStep = () => {
    if (step === "shipping") setStep("cart");
  };

  // Update shipping info
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Load saved coupon code on mount
  useEffect(() => {
    const savedCoupon = localStorage.getItem("couponCode");
    if (savedCoupon) {
      setCouponCode(savedCoupon);
    }
  }, []);

  return {
    cartItems,
    shippingMethod,
    setShippingMethod,
    couponCode,
    setCouponCode,
    step,
    shippingInfo,
    setShippingInfo,
    subtotal,
    shippingCost,
    discount,
    total,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    nextStep,
    prevStep,
    handleShippingInfoChange,
    setCountry: (value: string) => setShippingInfo({ ...shippingInfo, country: value })
  };
};
