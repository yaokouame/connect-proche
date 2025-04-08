
import { useToast } from "@/components/ui/use-toast";
import { Product, CartItem } from "@/types/user";

interface UseCartOperationsProps {
  cartItems: CartItem[];
  updateCartState: (items: CartItem[]) => void;
}

export const useCartOperations = ({ cartItems, updateCartState }: UseCartOperationsProps) => {
  const { toast } = useToast();

  const addToCart = (product: Product, prescription?: any) => {
    try {
      const existingItem = cartItems.find(
        (item) => item.product.id === product.id
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cartItems, { 
          product, 
          quantity: 1, 
          prescription: prescription || undefined 
        }];
      }
      
      updateCartState(updatedCart);
      
      toast({
        title: "Produit ajouté au panier",
        description: `${product.name} a été ajouté à votre panier.`,
      });

      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier. Veuillez réessayer.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    try {
      if (newQuantity < 1) {
        removeFromCart(productId);
        return;
      }
      
      const updatedCart = cartItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      
      updateCartState(updatedCart);
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
      const updatedCart = cartItems.filter(item => item.product.id !== productId);
      updateCartState(updatedCart);
      
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

  const clearCart = () => {
    try {
      localStorage.removeItem("cart");
      updateCartState([]);
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

  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
};
