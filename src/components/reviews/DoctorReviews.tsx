import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search, PlusCircle, Package } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from "react-router-dom";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

interface Review {
  id: string;
  doctorId?: string;
  productId?: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface OrderInfo {
  orderNumber: string;
  orderDate: string;
  from: string;
}

const DoctorReviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductReviews, setShowProductReviews] = useState(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedOrderInfo = localStorage.getItem("reviewOrderInfo");
    if (storedOrderInfo) {
      const parsedInfo = JSON.parse(storedOrderInfo);
      setOrderInfo(parsedInfo);
      setShowProductReviews(true);
      
      localStorage.removeItem("reviewOrderInfo");
    }
  }, []);
  
  const mockDoctors: Doctor[] = [
    {
      id: "d1",
      name: "Dr. Kouadio Koffi",
      specialty: "Cardiologie",
      location: "Abidjan - Cocody",
      rating: 4.8,
      reviewCount: 23
    },
    {
      id: "d2",
      name: "Dr. Assa Marie",
      specialty: "Pédiatrie",
      location: "Abidjan - Plateau",
      rating: 4.5,
      reviewCount: 17
    },
    {
      id: "d3",
      name: "Dr. Koné Issouf",
      specialty: "Dermatologie",
      location: "Abidjan - Marcory",
      rating: 4.2,
      reviewCount: 14
    },
    {
      id: "d4",
      name: "Dr. Aké Florence",
      specialty: "Psychiatrie",
      location: "Abidjan - Yopougon",
      rating: 4.7,
      reviewCount: 19
    }
  ];

  const mockProducts: Product[] = [
    {
      id: "p1",
      name: "Paracétamol 500mg",
      category: "Médicaments",
      price: 2500,
      imageUrl: "/placeholder.svg",
      rating: 4.6,
      reviewCount: 12
    },
    {
      id: "p2",
      name: "Tensiomètre électronique",
      category: "Équipements",
      price: 18500,
      imageUrl: "/placeholder.svg",
      rating: 4.3,
      reviewCount: 8
    },
    {
      id: "p3",
      name: "Vitamine C 1000mg",
      category: "Compléments",
      price: 4200,
      imageUrl: "/placeholder.svg",
      rating: 4.8,
      reviewCount: 14
    }
  ];

  const mockReviews: Record<string, Review[]> = {
    "d1": [
      {
        id: "r1",
        doctorId: "d1",
        userName: "Traore P.",
        rating: 5,
        comment: "Excellent médecin, très à l'écoute et professionnel.",
        date: "2023-06-15"
      },
      {
        id: "r2",
        doctorId: "d1",
        userName: "Bamba L.",
        rating: 4,
        comment: "Bon suivi médical, mais parfois long pour obtenir un rendez-vous.",
        date: "2023-08-22"
      }
    ],
    "d2": [
      {
        id: "r3",
        doctorId: "d2",
        userName: "Konan D.",
        rating: 5,
        comment: "Géniale avec les enfants, ma fille adore ses visites!",
        date: "2023-07-05"
      }
    ],
    "d3": [
      {
        id: "r4",
        doctorId: "d3",
        userName: "Kouassi T.",
        rating: 4,
        comment: "Diagnostic précis et traitement efficace.",
        date: "2023-09-10"
      }
    ],
    "d4": [
      {
        id: "r5",
        doctorId: "d4",
        userName: "Koffi B.",
        rating: 5,
        comment: "Excellente thérapeute, je la recommande vivement.",
        date: "2023-08-03"
      }
    ],
    "p1": [
      {
        id: "pr1",
        productId: "p1",
        userName: "Koné S.",
        rating: 5,
        comment: "Médicament efficace et prix abordable.",
        date: "2023-10-05"
      }
    ],
    "p2": [
      {
        id: "pr2",
        productId: "p2",
        userName: "Bamba F.",
        rating: 4,
        comment: "Bon produit, mais l'écran pourrait être plus grand.",
        date: "2023-09-18"
      }
    ]
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedDoctor(null);
  };

  const handleAddReview = () => {
    if (!selectedDoctor && !selectedProduct) {
      toast({
        title: "Aucun élément sélectionné",
        description: "Veuillez d'abord sélectionner un médecin ou un produit.",
        variant: "destructive"
      });
      return;
    }
    
    setShowReviewForm(true);
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    toast({
      title: "Avis envoyé",
      description: "Merci d'avoir partagé votre expérience.",
    });
    
    setShowReviewForm(false);
    
    if (orderInfo) {
      navigate("/");
      toast({
        title: "Merci pour votre avis!",
        description: "Votre avis a été enregistré pour la commande #" + orderInfo.orderNumber,
      });
    }
  };

  const toggleReviewMode = () => {
    setShowProductReviews(!showProductReviews);
    setSelectedDoctor(null);
    setSelectedProduct(null);
  };

  const filteredDoctors = mockDoctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {showProductReviews ? "Rechercher un produit" : "Rechercher un médecin ou un établissement"}
          </CardTitle>
          <CardDescription>
            {showProductReviews 
              ? "Trouvez et partagez des avis sur les produits de santé" 
              : "Trouvez et partagez des avis sur les professionnels de santé"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={showProductReviews ? "Nom du produit, catégorie..." : "Nom, spécialité ou ville..."}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={toggleReviewMode} variant="outline" className="whitespace-nowrap">
              {showProductReviews ? "Voir avis médecins" : "Voir avis produits"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {orderInfo && (
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              <p>
                Vous venez de la commande #{orderInfo.orderNumber} du {new Date(orderInfo.orderDate).toLocaleDateString('fr-FR')}. 
                Sélectionnez un produit pour laisser votre avis.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="font-semibold mb-4 text-lg">
            {showProductReviews ? "Produits" : "Médecins"}
          </h2>
          <div className="space-y-3">
            {showProductReviews ? (
              filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`cursor-pointer transition-colors hover:border-health-blue ${selectedProduct?.id === product.id ? 'border-health-blue bg-health-blue/5' : ''}`}
                  onClick={() => handleSelectProduct(product)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                        <div className="text-sm font-semibold">{product.price} F CFA</div>
                      </div>
                      {product.rating && (
                        <Badge className="bg-health-blue">{product.rating}</Badge>
                      )}
                    </div>
                    {product.rating && (
                      <div className="flex mt-2">
                        {renderStars(product.rating)}
                        <span className="text-xs ml-2 text-muted-foreground">({product.reviewCount || 0})</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              filteredDoctors.map((doctor) => (
                <Card 
                  key={doctor.id} 
                  className={`cursor-pointer transition-colors hover:border-health-blue ${selectedDoctor?.id === doctor.id ? 'border-health-blue bg-health-blue/5' : ''}`}
                  onClick={() => handleSelectDoctor(doctor)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{doctor.name}</h3>
                        <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
                        <div className="text-sm text-muted-foreground">{doctor.location}</div>
                      </div>
                      <Badge className="bg-health-blue">{doctor.rating}</Badge>
                    </div>
                    <div className="flex mt-2">
                      {renderStars(doctor.rating)}
                      <span className="text-xs ml-2 text-muted-foreground">({doctor.reviewCount})</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedDoctor || selectedProduct ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">
                  {selectedDoctor ? selectedDoctor.name : selectedProduct?.name}
                </h2>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleAddReview}
                >
                  <PlusCircle className="h-4 w-4" />
                  Ajouter un avis
                </Button>
              </div>
              
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-xl font-bold text-health-blue">
                      {selectedDoctor ? selectedDoctor.rating : selectedProduct?.rating || "-"}
                      <span className="text-sm font-normal text-muted-foreground ml-1">/5</span>
                    </div>
                    <div className="flex">
                      {renderStars(selectedDoctor ? selectedDoctor.rating : selectedProduct?.rating || 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Basé sur {selectedDoctor 
                        ? `${selectedDoctor.reviewCount} avis` 
                        : `${selectedProduct?.reviewCount || 0} avis`}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {showReviewForm ? (
                <ReviewForm 
                  entityId={selectedDoctor ? selectedDoctor.id : selectedProduct?.id || ""}
                  entityName={selectedDoctor ? selectedDoctor.name : selectedProduct?.name || ""}
                  entityType={selectedDoctor ? "doctor" : "product"}
                  onSubmit={handleReviewSubmit}
                  onCancel={() => setShowReviewForm(false)}
                />
              ) : (
                <div className="space-y-4">
                  {selectedDoctor && mockReviews[selectedDoctor.id]?.map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{review.userName}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString('fr-CI')}
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {selectedProduct && mockReviews[selectedProduct.id]?.map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{review.userName}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString('fr-CI')}
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {((selectedDoctor && !mockReviews[selectedDoctor.id]) || 
                    (selectedProduct && !mockReviews[selectedProduct.id])) && (
                    <Card>
                      <CardContent className="p-4 text-center text-muted-foreground">
                        <p>Aucun avis pour le moment</p>
                        <Button 
                          onClick={handleAddReview} 
                          variant="outline" 
                          className="mt-2"
                        >
                          Soyez le premier à donner votre avis
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 text-center text-muted-foreground">
              <div>
                <p>
                  {showProductReviews 
                    ? "Sélectionnez un produit pour voir les avis" 
                    : "Sélectionnez un médecin pour voir les avis"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorReviews;
