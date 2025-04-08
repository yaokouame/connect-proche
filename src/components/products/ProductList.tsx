
import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/user";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  searchTerm: string;
  onAddToCart: (product: Product) => void;
  enableVoiceHelp?: boolean;
}

// Optimized with React.memo to prevent unnecessary re-renders
const ProductList = React.memo(({ 
  products, 
  loading, 
  searchTerm, 
  onAddToCart,
  enableVoiceHelp = false
}: ProductListProps) => {
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  
  // Memoize the grid style to prevent recalculation on every render
  const gridStyle = useMemo(() => {
    return `grid grid-cols-1 ${isTablet ? 'sm:grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-6`;
  }, [isTablet]);

  // Display loading state
  if (loading) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Chargement des produits...</p>
      </div>
    );
  }

  // Display no products found message
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Aucun produit trouvé pour "<span className="font-medium">{searchTerm}</span>"</p>
      </div>
    );
  }

  // Display products grid
  return (
    <div className={gridStyle}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
          enableVoiceHelp={enableVoiceHelp}
        />
      ))}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;
