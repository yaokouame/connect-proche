
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Product, Prescription } from "@/types/user";

export interface CartItem {
  product: Product;
  quantity: number;
  prescription?: Prescription;
}

interface ShoppingCartState {
  items: CartItem[];
  error: string | null;
  loading: boolean;
}

export const useShoppingCart = () => {
  const [cartState, setCartState] = useState<ShoppingCartState>({
    items: [],
    error: null,
    loading: false
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isPrescriptionUploadOpen, setIsPrescriptionUploadOpen] = useState(false);
  const { toast } = useToast();

  // Alias for backward compatibility
  const cart = cartState.items;

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      setCartState(prev => ({ ...prev, loading: true }));
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartState({
          items: parsedCart,
          error: null,
          loading: false
        });
      } else {
        setCartState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error("Erreur lors du chargement du panier:", error);
      setCartState({
        items: [],
        error: "Impossible de charger votre panier. Veuillez réessayer.",
        loading: false
      });
      toast({
        title: "Erreur",
        description: "Impossible de charger votre panier. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const addToCart = (product: Product) => {
    if (product.requiresPrescription && !selectedPrescription) {
      setSelectedProduct(product);
      setIsPrescriptionUploadOpen(true);
      return;
    }
    
    try {
      setCartState(prev => {
        const existingItem = prev.items.find(
          (item) => item.product.id === product.id
        );

        let updatedCart;
        if (existingItem) {
          updatedCart = prev.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...prev.items, { 
            product, 
            quantity: 1, 
            prescription: selectedPrescription || undefined 
          }];
        }
        
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
        return {
          items: updatedCart,
          error: null,
          loading: false
        };
      });

      toast({
        title: "Produit ajouté au panier",
        description: `${product.name} a été ajouté à votre panier.`,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier. Veuillez réessayer.",
        variant: "destructive",
      });
    }
    
    setSelectedPrescription(null);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    try {
      if (newQuantity < 1) {
        removeFromCart(productId);
        return;
      }
      
      setCartState(prev => {
        const updatedCart = prev.items.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        );
        
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
        return {
          ...prev,
          items: updatedCart
        };
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la quantité. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = (productId: string) => {
    try {
      setCartState(prev => {
        const updatedCart = prev.items.filter(item => item.product.id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
        return {
          ...prev,
          items: updatedCart
        };
      });
      
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer le produit du panier. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handlePrescriptionSelect = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    
    setIsPrescriptionUploadOpen(false);
    
    if (selectedProduct) {
      setTimeout(() => {
        try {
          setCartState(prev => {
            const existingItem = prev.items.find(
              (item) => item.product.id === selectedProduct.id
            );

            let updatedCart;
            if (existingItem) {
              updatedCart = prev.items.map((item) =>
                item.product.id === selectedProduct.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {
              updatedCart = [...prev.items, { 
                product: selectedProduct, 
                quantity: 1,
                prescription
              }];
            }
            
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            
            return {
              ...prev,
              items: updatedCart
            };
          });

          toast({
            title: "Produit ajouté au panier",
            description: `${selectedProduct.name} a été ajouté à votre panier avec l'ordonnance.`,
          });
        } catch (error) {
          console.error("Erreur lors de l'ajout avec ordonnance:", error);
          toast({
            title: "Erreur",
            description: "Impossible d'ajouter le produit avec l'ordonnance. Veuillez réessayer.",
            variant: "destructive",
          });
        }
        
        setSelectedProduct(null);
      }, 500);
    }
  };

  const clearCart = () => {
    try {
      localStorage.removeItem("cart");
      setCartState({
        items: [],
        error: null,
        loading: false
      });
      toast({
        title: "Panier vidé",
        description: "Votre panier a été vidé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors du vidage du panier:", error);
      toast({
        title: "Erreur",
        description: "Impossible de vider votre panier. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  // Retry si erreur de chargement
  const retryLoadCart = () => {
    try {
      setCartState(prev => ({ ...prev, loading: true, error: null }));
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartState({
          items: JSON.parse(savedCart),
          error: null,
          loading: false
        });
      } else {
        setCartState({
          items: [],
          error: null,
          loading: false
        });
      }
    } catch (error) {
      console.error("Erreur lors de la nouvelle tentative de chargement:", error);
      setCartState(prev => ({
        ...prev,
        error: "Impossible de charger votre panier. Veuillez réessayer.",
        loading: false
      }));
    }
  };

  return {
    cart,
    error: cartState.error,
    loading: cartState.loading,
    selectedProduct,
    selectedPrescription,
    isPrescriptionUploadOpen,
    setIsPrescriptionUploadOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    handlePrescriptionSelect,
    clearCart,
    retryLoadCart,
    cartItemCount: cartState.items.reduce((sum, item) => sum + item.quantity, 0)
  };
};
