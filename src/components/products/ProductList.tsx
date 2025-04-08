
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/user";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  searchTerm: string;
  onAddToCart: (product: Product) => void;
}

const ProductList = ({ products, loading, searchTerm, onAddToCart }: ProductListProps) => {
  return (
    <>
      {loading ? (
        <div className="text-center py-8">
          <p>Chargement des produits...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
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
