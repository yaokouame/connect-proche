
import React from "react";
import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";

// Import our components
import ProductSearch from "@/components/products/ProductSearch";
import ProductList from "@/components/products/ProductList";
import ProductInfoBanner from "@/components/products/ProductInfoBanner";
import PrescriptionDialog from "@/components/products/PrescriptionDialog";
import CartHeader from "@/components/products/CartHeader";
import ErrorBoundary from "@/components/cart/ErrorBoundary";

// Import our custom hooks
import { useCachedProductsData } from "@/hooks/useCachedProductsData";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { usePrescriptionData } from "@/components/products/usePrescriptionData";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Products = () => {
  const { currentUser } = useUser();
  
  // Products data and filtering with cache
  const {
    filteredProducts,
    loading,
    error: productsError,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    categories,
    forceRefresh
  } = useCachedProductsData();

  // Shopping cart management with error handling
  const {
    cart,
    error: cartError,
    loading: cartLoading,
    selectedProduct,
    isPrescriptionUploadOpen,
    setIsPrescriptionUploadOpen,
    addToCart,
    handlePrescriptionSelect,
    cartItemCount,
    retryLoadCart
  } = useShoppingCart();

  // Prescription data
  const {
    userPrescriptions,
    isUploading,
    setIsUploading
  } = usePrescriptionData();

  // Combinaison des erreurs potentielles
  const hasError = productsError || cartError;

  // Fonction pour rafraîchir les données
  const handleRefresh = () => {
    if (productsError) {
      forceRefresh();
    }
    if (cartError) {
      retryLoadCart();
    }
  };

  return (
    <Layout>
      <ErrorBoundary>
        <div className="max-w-5xl mx-auto">
          <CartHeader cartItemCount={cartItemCount} />

          {hasError ? (
            <div className="my-8 p-4 bg-red-50 border border-red-200 rounded-md">
              <h2 className="text-lg font-semibold text-red-700 mb-2">
                Une erreur est survenue
              </h2>
              <p className="text-red-600 mb-4">
                {productsError || cartError}
              </p>
              <Button 
                onClick={handleRefresh}
                className="flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer
              </Button>
            </div>
          ) : (
            <>
              <ProductSearch 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                categories={categories}
              />

              <div className="flex justify-end my-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={forceRefresh}
                  className="text-xs flex items-center"
                  disabled={loading}
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Actualiser les produits
                </Button>
              </div>

              <ProductInfoBanner />

              <ProductList 
                products={filteredProducts}
                loading={loading}
                searchTerm={searchTerm}
                onAddToCart={addToCart}
              />
            </>
          )}
        </div>
        
        <PrescriptionDialog 
          isOpen={isPrescriptionUploadOpen}
          onClose={() => setIsPrescriptionUploadOpen(false)}
          userPrescriptions={userPrescriptions}
          onPrescriptionSelect={handlePrescriptionSelect}
          selectedPrescription={null}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          currentUserId={currentUser?.id || "guest"}
        />
      </ErrorBoundary>
    </Layout>
  );
};

export default Products;
