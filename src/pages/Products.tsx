
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Product, Prescription } from "@/types/user";
import { getProducts } from "@/services/dataService";

// Import our new components
import ProductSearch from "@/components/products/ProductSearch";
import ProductList from "@/components/products/ProductList";
import ProductInfoBanner from "@/components/products/ProductInfoBanner";
import PrescriptionDialog from "@/components/products/PrescriptionDialog";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [cart, setCart] = useState<{ product: Product; quantity: number; prescription?: Prescription }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userPrescriptions, setUserPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isPrescriptionUploadOpen, setIsPrescriptionUploadOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useUser();

  const mockPrescriptions: Prescription[] = [
    {
      id: "presc-1",
      patientId: "patient-456",
      professionalId: "pro-123",
      professionalName: "Jean Michel",
      date: "15/09/2023",
      expiryDate: "15/12/2023",
      status: "active",
      medications: [
        {
          name: "Amoxicilline",
          dosage: "500mg",
          frequency: "3 fois par jour",
          duration: "7 jours"
        },
        {
          name: "Doliprane",
          dosage: "1000mg",
          frequency: "Si douleur",
          duration: "Au besoin"
        }
      ],
      instructions: "Prendre avec de la nourriture. Terminer le traitement complet même si les symptômes s'améliorent.",
      prescriptionImage: {
        id: "file-1",
        fileUrl: "/placeholder.svg",
        fileName: "ordonnance_sept2023.jpg",
        uploadDate: "2023-09-15",
        verified: true,
        verifiedBy: "Pharmacie Centrale",
        verificationDate: "2023-09-15"
      }
    }
  ];

  useEffect(() => {
    setUserPrescriptions(mockPrescriptions);
    
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
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

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-health-dark">Pharmacie en ligne</h1>
          <div className="flex items-center mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Panier ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Button>
          </div>
        </div>

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
        selectedPrescription={selectedPrescription}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        currentUserId={currentUser?.id || "guest"}
      />
    </Layout>
  );
};

export default Products;
