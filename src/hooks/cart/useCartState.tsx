
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/types/user";

interface CartState {
  items: CartItem[];
  error: string | null;
  loading: boolean;
}

export const useCartState = () => {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    error: null,
    loading: false
  });
  const { toast } = useToast();

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

  // Save cart to localStorage
  const saveCart = (items: CartItem[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du panier:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre panier. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  // Update cart state
  const updateCartState = (items: CartItem[]) => {
    setCartState(prev => ({
      ...prev,
      items,
      error: null
    }));
    saveCart(items);
  };

  // Retry loading cart if there was an error
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
    cartState,
    updateCartState,
    retryLoadCart
  };
};
