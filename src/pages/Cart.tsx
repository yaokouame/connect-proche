
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Minus, FileText, CreditCard, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";
import { CartItem, Product, Prescription } from "@/types/user";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useUser();
  
  // En production, on utiliserait un état global ou un contexte pour le panier
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [couponCode, setCouponCode] = useState("");
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "insurance">("card");
  
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
      setStep("payment");
    }
  };

  // Retourner à l'étape précédente
  const prevStep = () => {
    if (step === "shipping") setStep("cart");
    if (step === "payment") setStep("shipping");
  };

  // Mettre à jour les informations de livraison
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Finaliser la commande
  const placeOrder = () => {
    // Simuler le traitement de la commande
    toast({
      title: "Commande en cours de traitement",
      description: "Veuillez patienter...",
    });

    // En production, on appellerait une API pour créer la commande
    setTimeout(() => {
      // Vider le panier
      setCartItems([]);
      localStorage.removeItem("cart");

      toast({
        title: "Commande confirmée !",
        description: "Merci pour votre achat. Vous recevrez un email de confirmation.",
      });

      // Rediriger vers la page de confirmation
      navigate("/order-confirmation");
    }, 2000);
  };

  if (cartItems.length === 0 && step === "cart") {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto mt-10 p-8">
          <h1 className="text-3xl font-bold mb-8 text-health-dark">Votre Panier</h1>
          <Card>
            <CardContent className="p-10 text-center">
              <p className="text-gray-500 mb-6">Votre panier est vide</p>
              <Button onClick={() => navigate("/products")}>
                Parcourir les produits
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold my-8 text-health-dark">
          {step === "cart" ? "Votre Panier" : step === "shipping" ? "Livraison" : "Paiement"}
        </h1>

        {/* Étapes du processus d'achat */}
        <div className="flex justify-between mb-8">
          <div className={`flex flex-col items-center ${step === "cart" ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step === "cart" ? "bg-primary text-white" : "bg-gray-200"}`}>
              1
            </div>
            <span className="text-sm">Panier</span>
          </div>
          <div className="flex-1 border-t border-gray-200 relative top-4 mx-4"></div>
          <div className={`flex flex-col items-center ${step === "shipping" ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step === "shipping" ? "bg-primary text-white" : "bg-gray-200"}`}>
              2
            </div>
            <span className="text-sm">Livraison</span>
          </div>
          <div className="flex-1 border-t border-gray-200 relative top-4 mx-4"></div>
          <div className={`flex flex-col items-center ${step === "payment" ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step === "payment" ? "bg-primary text-white" : "bg-gray-200"}`}>
              3
            </div>
            <span className="text-sm">Paiement</span>
          </div>
        </div>

        {/* Afficher le contenu en fonction de l'étape */}
        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Articles ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center py-4 border-b last:border-0">
                      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded">
                        <img src={item.product.imageUrl} alt={item.product.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.category}</p>
                        {item.product.requiresPrescription && item.prescription && (
                          <div className="flex items-center mt-1 text-xs text-green-600">
                            <FileText className="w-3 h-3 mr-1" />
                            Ordonnance fournie
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="w-20 text-right font-medium">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </div>
                      <Button variant="ghost" size="icon" className="ml-2" onClick={() => removeFromCart(item.product.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>{shippingCost.toFixed(2)} €</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Réduction</span>
                        <span>-{discount.toFixed(2)} €</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>

                    <div className="pt-4">
                      <Label htmlFor="shipping-method">Méthode de livraison</Label>
                      <Select value={shippingMethod} onValueChange={setShippingMethod}>
                        <SelectTrigger id="shipping-method" className="w-full">
                          <SelectValue placeholder="Choisir une méthode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (3-5 jours) - 3,99 €</SelectItem>
                          <SelectItem value="express">Express (1-2 jours) - 7,99 €</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Code promo"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyCoupon}>Appliquer</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={nextStep}>Passer à la livraison</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {step === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Adresse de livraison</CardTitle>
                  <CardDescription>Veuillez entrer vos informations de livraison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleShippingInfoChange}
                        placeholder="Prénom Nom"
                      />
                    </div>
                    <div>
                      <Label htmlFor="streetAddress">Adresse</Label>
                      <Input
                        id="streetAddress"
                        name="streetAddress"
                        value={shippingInfo.streetAddress}
                        onChange={handleShippingInfoChange}
                        placeholder="Numéro et nom de rue"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingInfoChange}
                          placeholder="Ville"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={handleShippingInfoChange}
                          placeholder="Code postal"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Pays</Label>
                      <Select value={shippingInfo.country} onValueChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Belgique">Belgique</SelectItem>
                          <SelectItem value="Suisse">Suisse</SelectItem>
                          <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingInfoChange}
                        placeholder="Numéro de téléphone"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                      <p>Articles: {cartItems.length}</p>
                      <p>Livraison: {shippingMethod === "express" ? "Express (1-2 jours)" : "Standard (3-5 jours)"}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>Retour</Button>
                  <Button onClick={nextStep}>Continuer vers le paiement</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Méthode de paiement</CardTitle>
                  <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="card-payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="h-4 w-4 text-primary"
                      />
                      <label htmlFor="card-payment" className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Carte bancaire
                      </label>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="ml-6 space-y-4 mt-2">
                        <div>
                          <Label htmlFor="card-number">Numéro de carte</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Date d'expiration</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="card-name">Nom sur la carte</Label>
                          <Input id="card-name" placeholder="Prénom Nom" />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="radio"
                        id="insurance-payment"
                        checked={paymentMethod === "insurance"}
                        onChange={() => setPaymentMethod("insurance")}
                        className="h-4 w-4 text-primary"
                      />
                      <label htmlFor="insurance-payment" className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        Paiement par assurance santé
                      </label>
                    </div>

                    {paymentMethod === "insurance" && (
                      <div className="ml-6 space-y-4 mt-2">
                        <div>
                          <Label htmlFor="insurance-provider">Assureur</Label>
                          <Select>
                            <SelectTrigger id="insurance-provider">
                              <SelectValue placeholder="Sélectionner votre assureur" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cpam">CPAM (Assurance Maladie)</SelectItem>
                              <SelectItem value="mgen">MGEN</SelectItem>
                              <SelectItem value="axa">AXA Santé</SelectItem>
                              <SelectItem value="harmonie">Harmonie Mutuelle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="insurance-number">Numéro d'assuré</Label>
                          <Input id="insurance-number" placeholder="Numéro d'assuré" />
                        </div>
                        <div>
                          <Label htmlFor="voucher">Bon de prise en charge</Label>
                          <div className="flex">
                            <Input id="voucher" type="file" className="flex-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Livraison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start">
                      <Truck className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <p className="font-medium">{shippingInfo.fullName}</p>
                        <p className="text-sm text-gray-500">{shippingInfo.streetAddress}</p>
                        <p className="text-sm text-gray-500">{shippingInfo.postalCode} {shippingInfo.city}, {shippingInfo.country}</p>
                        <p className="text-sm text-gray-500">{shippingInfo.phone}</p>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Méthode de livraison: </span>
                          {shippingMethod === "express" ? "Express (1-2 jours)" : "Standard (3-5 jours)"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Table>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.product.id}>
                            <TableCell className="font-medium w-full">
                              {item.product.name} <span className="text-gray-500">x{item.quantity}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              {(item.product.price * item.quantity).toFixed(2)} €
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell>Sous-total</TableCell>
                          <TableCell className="text-right">{subtotal.toFixed(2)} €</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Livraison</TableCell>
                          <TableCell className="text-right">{shippingCost.toFixed(2)} €</TableCell>
                        </TableRow>
                        {discount > 0 && (
                          <TableRow>
                            <TableCell className="text-green-600">Réduction</TableCell>
                            <TableCell className="text-right text-green-600">-{discount.toFixed(2)} €</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full" onClick={placeOrder}>Confirmer la commande</Button>
                  <Button variant="outline" className="w-full" onClick={prevStep}>Retour</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
