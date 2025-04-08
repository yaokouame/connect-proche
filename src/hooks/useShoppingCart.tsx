
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Product, Prescription } from "@/types/user";

export interface CartItem {
  product: Product;
  quantity: number;
  prescription?: Prescription;
}

export const useShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isPrescriptionUploadOpen, setIsPrescriptionUploadOpen] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    if (product.requiresPrescription && !selectedPrescription) {
      setSelectedProduct(product);
      setIsPrescriptionUploadOpen(true);
      return;
    }
    
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { 
          product, 
          quantity: 1, 
          prescription: selectedPrescription || undefined 
        }];
      }
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      
      return updatedCart;
    });

    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    });
    
    setSelectedPrescription(null);
  };

  const handlePrescriptionSelect = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    
    setIsPrescriptionUploadOpen(false);
    
    if (selectedProduct) {
      setTimeout(() => {
        setCart((prevCart) => {
          const existingItem = prevCart.find(
            (item) => item.product.id === selectedProduct.id
          );

          let updatedCart;
          if (existingItem) {
            updatedCart = prevCart.map((item) =>
              item.product.id === selectedProduct.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            updatedCart = [...prevCart, { 
              product: selectedProduct, 
              quantity: 1,
              prescription
            }];
          }
          
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          
          return updatedCart;
        });

        toast({
          title: "Produit ajouté au panier",
          description: `${selectedProduct.name} a été ajouté à votre panier avec l'ordonnance.`,
        });
        
        setSelectedProduct(null);
      }, 500);
    }
  };

  return {
    cart,
    selectedProduct,
    selectedPrescription,
    isPrescriptionUploadOpen,
    setIsPrescriptionUploadOpen,
    addToCart,
    handlePrescriptionSelect,
    cartItemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
  };
};
