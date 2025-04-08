
import React from "react";
import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";

// Import our components
import ProductSearch from "@/components/products/ProductSearch";
import ProductList from "@/components/products/ProductList";
import ProductInfoBanner from "@/components/products/ProductInfoBanner";
import PrescriptionDialog from "@/components/products/PrescriptionDialog";
import CartHeader from "@/components/products/CartHeader";

// Import our custom hooks
import { useProductsData } from "@/hooks/useProductsData";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { usePrescriptionData } from "@/components/products/usePrescriptionData";

const Products = () => {
  const { currentUser } = useUser();
  
  // Products data and filtering
  const {
    filteredProducts,
    loading,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    categories
  } = useProductsData();

  // Shopping cart management
  const {
    cart,
    selectedProduct,
    isPrescriptionUploadOpen,
    setIsPrescriptionUploadOpen,
    addToCart,
    handlePrescriptionSelect,
    cartItemCount
  } = useShoppingCart();

  // Prescription data
  const {
    userPrescriptions,
    isUploading,
    setIsUploading
  } = usePrescriptionData();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <CartHeader cartItemCount={cartItemCount} />

        <ProductSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />

        <ProductInfoBanner />

        <ProductList 
          products={filteredProducts}
          loading={loading}
          searchTerm={searchTerm}
          onAddToCart={addToCart}
        />
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
    </Layout>
  );
};

export default Products;
