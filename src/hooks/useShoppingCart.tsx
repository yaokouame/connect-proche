
import { useCallback } from "react";
import { Product, Prescription } from "@/types/user";
import { useCartState } from "./cart/useCartState";
import { usePrescriptionHandling } from "./cart/usePrescriptionHandling";
import { useCartOperations } from "./cart/useCartOperations";

export interface CartItem {
  product: Product;
  quantity: number;
  prescription?: Prescription;
}

export const useShoppingCart = () => {
  const { cartState, updateCartState, retryLoadCart } = useCartState();
  
  const {
    selectedProduct,
    setSelectedProduct,
    selectedPrescription,
    setSelectedPrescription,
    isPrescriptionUploadOpen,
    setIsPrescriptionUploadOpen,
    handlePrescriptionSelect,
    resetPrescriptionState
  } = usePrescriptionHandling();
  
  const cartOperations = useCartOperations({
    cartItems: cartState.items,
    updateCartState
  });
  
  const addToCart = useCallback((product: Product) => {
    if (product.requiresPrescription && !selectedPrescription) {
      setSelectedProduct(product);
      setIsPrescriptionUploadOpen(true);
      return;
    }
    
    const success = cartOperations.addToCart(product, selectedPrescription);
    if (success) {
      resetPrescriptionState();
    }
  }, [cartOperations, selectedPrescription, setSelectedProduct, setIsPrescriptionUploadOpen, resetPrescriptionState]);
  
  // Enhanced handlePrescriptionSelect that works with the addToCart flow
  const handlePrescriptionSelectWithAddToCart = useCallback((prescription: Prescription) => {
    handlePrescriptionSelect(prescription);
    
    setTimeout(() => {
      if (selectedProduct) {
        cartOperations.addToCart(selectedProduct, prescription);
        resetPrescriptionState();
      }
    }, 500);
  }, [handlePrescriptionSelect, selectedProduct, cartOperations, resetPrescriptionState]);

  return {
    cart: cartState.items,
    error: cartState.error,
    loading: cartState.loading,
    selectedProduct,
    selectedPrescription,
    isPrescriptionUploadOpen,
    setIsPrescriptionUploadOpen,
    addToCart,
    updateQuantity: cartOperations.updateQuantity,
    removeFromCart: cartOperations.removeFromCart,
    handlePrescriptionSelect: handlePrescriptionSelectWithAddToCart,
    clearCart: cartOperations.clearCart,
    retryLoadCart,
    cartItemCount: cartState.items.reduce((sum, item) => sum + item.quantity, 0)
  };
};
