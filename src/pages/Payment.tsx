
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { CartItem } from "@/types/user";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import CardPaymentForm from "@/components/payment/CardPaymentForm";
import InsurancePaymentForm from "@/components/payment/InsurancePaymentForm";
import OrderSummary from "@/components/payment/OrderSummary";
import { ChevronLeft, CreditCard, Check, Loader2 } from "lucide-react";

type PaymentMethod = "card" | "insurance" | "paypal";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { currentUser } = useUser();
  
  // Récupérer les données du panier du localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [shippingCost, setShippingCost] = useState(3.99);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  
  // État du formulaire de paiement
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  
  // État pour le formulaire de carte
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  // État pour le formulaire d'assurance
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [hasVoucher, setHasVoucher] = useState(false);
  
  // États pour le paiement
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  
  // Calculer le total
  useEffect(() => {
    // Récupérer les données du panier et de la livraison du localStorage
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
      
      // Calculer la réduction
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const subtotal = cart.reduce(
          (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
          0
        );
        setDiscount(subtotal * 0.1);
      }
    }
  }, []);
  
  // Calculer le total
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(subtotal + shippingCost - discount);
  }, [cartItems, shippingCost, discount]);
  
  // Rediriger vers le panier si celui-ci est vide
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  
  // Remplir les informations du titulaire de carte avec le nom de l'utilisateur
  useEffect(() => {
    if (currentUser?.name && cardHolder === "") {
      setCardHolder(currentUser.name);
    }
  }, [currentUser, cardHolder]);
  
  const validatePayment = () => {
    if (paymentMethod === "card") {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length < 16) {
        toast({
          variant: "destructive",
          title: "Numéro de carte invalide",
          description: "Veuillez saisir un numéro de carte valide",
        });
        return false;
      }
      
      if (!cardHolder.trim()) {
        toast({
          variant: "destructive",
          title: "Titulaire de la carte manquant",
          description: "Veuillez saisir le nom du titulaire de la carte",
        });
        return false;
      }
      
      if (!expiryDate.trim() || !expiryDate.includes("/") || expiryDate.length < 5) {
        toast({
          variant: "destructive",
          title: "Date d'expiration invalide",
          description: "Veuillez saisir une date d'expiration valide (MM/YY)",
        });
        return false;
      }
      
      if (!cvv.trim() || cvv.length < 3) {
        toast({
          variant: "destructive",
          title: "CVV invalide",
          description: "Veuillez saisir un code de sécurité valide",
        });
        return false;
      }
    } else if (paymentMethod === "insurance") {
      if (!insuranceProvider) {
        toast({
          variant: "destructive",
          title: "Assureur manquant",
          description: "Veuillez sélectionner votre assureur",
        });
        return false;
      }
      
      if (!policyNumber.trim()) {
        toast({
          variant: "destructive",
          title: "Numéro de police manquant",
          description: "Veuillez saisir votre numéro de police d'assurance",
        });
        return false;
      }
    }
    
    return true;
  };
  
  const processPayment = () => {
    if (!validatePayment()) return;
    
    setIsProcessing(true);
    
    // Simuler un traitement de paiement
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessDialogOpen(true);
      
      // Vider le panier
      localStorage.removeItem("cart");
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("shippingMethod");
      localStorage.removeItem("couponCode");
    }, 2000);
  };
  
  const handleSuccessClose = () => {
    setIsSuccessDialogOpen(false);
    navigate("/order-confirmation");
  };
  
  if (!shippingInfo) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto mt-8 p-4">
          <h1 className="text-3xl font-bold mb-6 text-health-dark">Paiement</h1>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
            <p className="text-amber-800 mb-4">
              Vous devez d'abord renseigner vos informations de livraison
            </p>
            <Button onClick={() => navigate("/cart")}>
              Retour au panier
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-8 p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/cart")}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour au panier
        </Button>
        
        <h1 className="text-3xl font-bold mb-6 text-health-dark">Paiement</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Choisissez votre mode de paiement</h2>
            
            {/* Sélecteur de méthode de paiement */}
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
            
            {/* Formulaire de paiement par carte */}
            {paymentMethod === "card" && (
              <CardPaymentForm
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardHolder={cardHolder}
                setCardHolder={setCardHolder}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                cvv={cvv}
                setCvv={setCvv}
              />
            )}
            
            {/* Formulaire de paiement par assurance */}
            {paymentMethod === "insurance" && (
              <InsurancePaymentForm
                insuranceProvider={insuranceProvider}
                setInsuranceProvider={setInsuranceProvider}
                policyNumber={policyNumber}
                setPolicyNumber={setPolicyNumber}
                hasVoucher={hasVoucher}
                setHasVoucher={setHasVoucher}
              />
            )}
            
            {/* Formulaire PayPal */}
            {paymentMethod === "paypal" && (
              <div className="p-4 border rounded-lg">
                <p className="text-center mb-4">
                  Vous serez redirigé vers PayPal pour compléter votre paiement
                </p>
                <div className="flex justify-center">
                  <img 
                    src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/44_Yellow_AcceptanceMark_Pill_Button.png" 
                    alt="PayPal"
                    className="h-12"
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center mt-6">
              <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-sm text-gray-500">
                Paiement sécurisé - Toutes vos informations sont chiffrées
              </p>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={processPayment} 
                className="w-full py-6 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  `Payer ${total.toFixed(2)} €`
                )}
              </Button>
            </div>
          </div>
          
          <div>
            {/* Récapitulatif de la commande */}
            <OrderSummary
              cartItems={cartItems}
              shippingCost={shippingCost}
              discount={discount}
              total={total}
            />
            
            {/* Informations de livraison */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Adresse de livraison</h3>
              <p>{shippingInfo.fullName}</p>
              <p>{shippingInfo.streetAddress}</p>
              <p>{shippingInfo.postalCode} {shippingInfo.city}</p>
              <p>{shippingInfo.country}</p>
              <p className="text-gray-500 mt-2">{shippingInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialogue de confirmation */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <Check className="mr-2 h-6 w-6" />
              Paiement réussi
            </DialogTitle>
            <DialogDescription>
              Votre commande a été confirmée et sera traitée dans les plus brefs délais.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">Numéro de commande: <span className="font-medium">{`ORD-${Date.now().toString().slice(-8)}`}</span></p>
            <p>Un e-mail de confirmation vous a été envoyé.</p>
          </div>
          <DialogFooter>
            <Button onClick={handleSuccessClose}>Voir les détails de ma commande</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Payment;
