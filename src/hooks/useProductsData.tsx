
import { useState, useEffect } from "react";
import { Product } from "@/types/user";
import { getProducts } from "@/services/dataService";

export const useProductsData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter(
        (product) => product.category === categoryFilter
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, products]);

  // Get unique categories from products
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return {
    products,
    filteredProducts,
    loading,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    categories
  };
};
