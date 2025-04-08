
import { useState, useEffect } from "react";
import { Product } from "@/types/user";
import { getProducts } from "@/services/productService";
import { useToast } from "@/components/ui/use-toast";

export const useCachedProductsData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  // Fetch products on mount with caching
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check for cached data first
        const cachedData = localStorage.getItem("cachedProducts");
        const cachedTimestamp = localStorage.getItem("cachedProductsTimestamp");
        
        // Use cache if it exists and is less than 5 minutes old
        if (cachedData && cachedTimestamp) {
          const parsedData = JSON.parse(cachedData);
          const timestamp = parseInt(cachedTimestamp);
          const fiveMinutes = 5 * 60 * 1000;
          
          if (Date.now() - timestamp < fiveMinutes) {
            console.log("Using cached product data");
            setProducts(parsedData);
            setFilteredProducts(parsedData);
            setLoading(false);
            return;
          }
        }
        
        // Fetch fresh data if cache is outdated or doesn't exist
        console.log("Fetching fresh product data");
        const data = await getProducts();
        
        // Cache the fresh data
        localStorage.setItem("cachedProducts", JSON.stringify(data));
        localStorage.setItem("cachedProductsTimestamp", Date.now().toString());
        
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Impossible de charger les produits. Veuillez réessayer plus tard.");
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits. Veuillez réessayer plus tard.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

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

  // Clear cache function for testing or forced refresh
  const clearCache = () => {
    localStorage.removeItem("cachedProducts");
    localStorage.removeItem("cachedProductsTimestamp");
  };

  // Force refresh function to bypass cache
  const forceRefresh = async () => {
    clearCache();
    setLoading(true);
    
    try {
      const data = await getProducts();
      localStorage.setItem("cachedProducts", JSON.stringify(data));
      localStorage.setItem("cachedProductsTimestamp", Date.now().toString());
      
      setProducts(data);
      setFilteredProducts(data);
      
      toast({
        title: "Mise à jour réussie",
        description: "La liste des produits a été actualisée.",
      });
    } catch (error) {
      console.error("Error refreshing products:", error);
      setError("Impossible d'actualiser les produits. Veuillez réessayer plus tard.");
      toast({
        title: "Erreur",
        description: "Impossible d'actualiser les produits. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from products
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    categories,
    forceRefresh,
    clearCache
  };
};
