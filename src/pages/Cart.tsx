
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { CartItem } from "@/types/user";
import EmptyCart from "@/components/cart/EmptyCart";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import CheckoutSteps from "@/components/cart/CheckoutSteps";
import ShippingStepContent from "@/components/cart/ShippingStepContent";
import { useUser } from "@/contexts/UserContext";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useUser();
  
  // En production, on utiliserait un état global ou un contexte pour le panier
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [shippingMethod, setShippingMethod] = useState<string>(() => {
    const savedMethod = localStorage.getItem("shippingMethod");
    return savedMethod || "standard";
  });
  
  const [couponCode, setCouponCode] = useState("");
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");
  
  // Informations de livraison
  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser?.name || "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "France",
    phone: "",
  });

  // Calcul des totaux
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const shippingCost = shippingMethod === "express" ? 7.99 : 3.99;
  const discount = couponCode === "SANTE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discount;

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.product.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
    });
  };

  // Appliquer un code promo
  const applyCoupon = () => {
    if (couponCode === "SANTE10") {
      localStorage.setItem("couponCode", couponCode);
      toast({
        title: "Code promo appliqué",
        description: "10% de réduction sur votre commande",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Code promo invalide",
        description: "Ce code promo n'existe pas ou a expiré",
      });
    }
  };

  // Passer à l'étape suivante
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
      // Vérifier que tous les champs de livraison sont remplis
      const { fullName, streetAddress, city, postalCode, phone } = shippingInfo;
      if (!fullName || !streetAddress || !city || !postalCode || !phone) {
        toast({
          variant: "destructive",
          title: "Informations incomplètes",
          description: "Veuillez remplir tous les champs obligatoires",
        });
        return;
      }
      
      // Enregistrer les informations de livraison
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
      localStorage.setItem("shippingMethod", shippingMethod);
      
      // Rediriger vers la page de paiement
      navigate("/payment");
    }
  };

  // Retourner à l'étape précédente
  const prevStep = () => {
    if (step === "shipping") setStep("cart");
  };

  // Mettre à jour les informations de livraison
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  if (cartItems.length === 0 && step === "cart") {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto mt-10 p-8">
          <h1 className="text-3xl font-bold mb-8 text-health-dark">Votre Panier</h1>
          <EmptyCart />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold my-8 text-health-dark">
          {step === "cart" ? "Votre Panier" : "Livraison"}
        </h1>

        {/* Étapes du processus d'achat */}
        <CheckoutSteps step={step} />

        {/* Afficher le contenu en fonction de l'étape */}
        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems 
                cartItems={cartItems} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
              />
            </div>

            <div>
              <CartSummary
                cartItems={cartItems}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                applyCoupon={applyCoupon}
                nextStep={nextStep}
                subtotal={subtotal}
                shippingCost={shippingCost}
                discount={discount}
                total={total}
              />
            </div>
          </div>
        )}

        {step === "shipping" && (
          <ShippingStepContent
            cartItems={cartItems}
            shippingInfo={shippingInfo}
            handleShippingInfoChange={handleShippingInfoChange}
            setCountry={(value) => setShippingInfo({ ...shippingInfo, country: value })}
            shippingMethod={shippingMethod}
            total={total}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}
      </div>
    </Layout>
  );
};

export default Cart;
