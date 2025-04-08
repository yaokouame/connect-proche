
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProductList from "@/components/products/ProductList";
import ProductSearch from "@/components/products/ProductSearch";
import ProductInfoBanner from "@/components/products/ProductInfoBanner";
import { useProductsData } from "@/hooks/useProductsData";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { Product } from "@/types/user";
import PageVoiceHelp from "@/components/voice/PageVoiceHelp";

const Products = () => {
  const { products, loading, categories } = useProductsData();
  const { addToCart } = useShoppingCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [enableVoiceHelp, setEnableVoiceHelp] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const pageDescription = "Page des produits médicaux. Vous pouvez rechercher des produits par nom ou description, filtrer par catégorie, et ajouter des produits à votre panier. Utilisez la fonction de recherche vocale pour une expérience plus accessible.";

  const featureInstructions = {
    search: "Pour rechercher un produit, tapez son nom ou sa description dans la barre de recherche. Vous pouvez aussi utiliser la fonction de recherche vocale en cliquant sur l'icône du microphone.",
    filter: "Pour filtrer les produits par catégorie, utilisez le menu déroulant de sélection de catégorie.",
    addToCart: "Pour ajouter un produit à votre panier, cliquez sur le bouton Ajouter au panier sur la carte du produit."
  };

  const toggleVoiceHelp = () => {
    setEnableVoiceHelp(!enableVoiceHelp);
  };

  return (
    <Layout>
      <div className="container px-4 py-6 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Produits médicaux</h1>
          <button
            onClick={toggleVoiceHelp}
            className="text-sm text-health-blue hover:text-health-teal underline"
          >
            {enableVoiceHelp ? "Désactiver l'assistance vocale" : "Activer l'assistance vocale"}
          </button>
        </div>

        <ProductInfoBanner />
        
        <ProductSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />
        
        <ProductList
          products={filteredProducts}
          loading={loading}
          searchTerm={searchTerm}
          onAddToCart={handleAddToCart}
          enableVoiceHelp={enableVoiceHelp}
        />
      </div>
      
      <PageVoiceHelp 
        pageDescription={pageDescription}
        instructions={featureInstructions}
        position="bottom-right"
      />
    </Layout>
  );
};

export default Products;
