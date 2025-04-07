import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Product, Prescription } from "@/types/user";
import { getProducts } from "@/services/dataService";
import { Search, Filter, ShoppingCart, FileText, Upload, Paperclip, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

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
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "application/pdf") {
      toast({
        title: "Format de fichier non supporté",
        description: "Veuillez télécharger une image (JPEG, PNG) ou un PDF",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 5 Mo",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    setTimeout(() => {
      const newPrescription: Prescription = {
        id: `presc-${Date.now()}`,
        patientId: currentUser?.id || "guest",
        professionalId: "unknown",
        professionalName: "Ordonnance externe",
        date: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: "active",
        medications: [],
        instructions: "Ordonnance externe téléchargée via l'application",
        prescriptionImage: {
          id: `file-${Date.now()}`,
          fileUrl: URL.createObjectURL(file),
          fileName: file.name,
          uploadDate: new Date().toISOString().split('T')[0],
          verified: false
        }
      };
      
      setUserPrescriptions((prev) => [...prev, newPrescription]);
      setSelectedPrescription(newPrescription);
      setIsUploading(false);
      setIsPrescriptionUploadOpen(false);
      
      toast({
        title: "Ordonnance téléchargée",
        description: "Votre ordonnance a été téléchargée et sera vérifiée par un pharmacien.",
      });
      
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
    }, 1500);
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

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8">
          <div className="flex items-start">
            <FileText className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-700">Médicaments sur ordonnance</h3>
              <p className="text-sm text-blue-600 mt-1">
                Pour les médicaments sur ordonnance, vous devrez télécharger une ordonnance valide
                qui sera vérifiée par un pharmacien avant l'expédition. Vous pouvez utiliser une ordonnance
                déjà enregistrée ou en télécharger une nouvelle.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Chargement des produits...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-contain w-full h-full p-6"
                  />
                  {product.requiresPrescription && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500">
                      Sur ordonnance
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Rupture de stock
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                  <p className="font-bold text-health-dark">{product.price.toFixed(2)} €</p>
                  {product.insuranceCoverage?.eligible && (
                    <div className="mt-1">
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {product.insuranceCoverage.coveragePercentage 
                          ? `Remboursable ${product.insuranceCoverage.coveragePercentage}%` 
                          : "Remboursable"}
                      </span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.requiresPrescription
                      ? "Ajouter avec ordonnance"
                      : !product.inStock
                      ? "Indisponible"
                      : "Ajouter au panier"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun produit trouvé pour "{searchTerm}"</p>
          </div>
        )}
      </div>
      
      <Dialog open={isPrescriptionUploadOpen} onOpenChange={setIsPrescriptionUploadOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ordonnance requise</DialogTitle>
            <DialogDescription>
              Ce médicament nécessite une ordonnance valide. Veuillez fournir une ordonnance pour continuer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-2">
            {userPrescriptions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Vos ordonnances disponibles</h3>
                <div className="space-y-2">
                  {userPrescriptions
                    .filter(p => p.status === "active")
                    .map(prescription => (
                      <div 
                        key={prescription.id}
                        className={`border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors
                                  ${selectedPrescription?.id === prescription.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => handlePrescriptionSelect(prescription)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">Dr. {prescription.professionalName}</p>
                              <p className="text-xs text-gray-500">
                                Expire le {prescription.expiryDate}
                              </p>
                            </div>
                          </div>
                          {prescription.prescriptionImage?.verified && (
                            <Badge className="bg-green-500">
                              <Check className="w-3 h-3 mr-1" />
                              Vérifié
                            </Badge>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            )}
            
            {userPrescriptions.length > 0 && (
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium mb-2">Télécharger une nouvelle ordonnance</h3>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/jpeg,image/png,application/pdf" 
                className="hidden" 
              />
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={triggerFileInput}
                disabled={isUploading}
              >
                {isUploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    Téléchargement...
                  </div>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Télécharger ordonnance
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                Formats acceptés: JPEG, PNG, PDF (max 5 Mo)
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrescriptionUploadOpen(false)}>
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Products;
