
import React from "react";
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

const ProductList = ({ 
  products, 
  loading, 
  searchTerm, 
  onAddToCart,
  enableVoiceHelp = false
}: ProductListProps) => {
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");

  return (
    <>
      {loading ? (
        <div className="text-center py-8">
          <p>Chargement des produits...</p>
        </div>
      ) : products.length > 0 ? (
        <div className={`grid grid-cols-1 ${isTablet ? 'sm:grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 md:gap-6`}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              enableVoiceHelp={enableVoiceHelp}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucun produit trouvé pour "{searchTerm}"</p>
        </div>
      )}
    </>
  );
};

export default ProductList;
