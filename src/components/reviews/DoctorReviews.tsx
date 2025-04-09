
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from "react-router-dom";
import { Doctor, Product, OrderInfo } from "./types";
import { mockDoctors, mockProducts, mockReviews } from "./mockData";
import SearchHeader from "./SearchHeader";
import OrderInfoBanner from "./OrderInfoBanner";
import EntityList from "./EntityList";
import EntityDetails from "./EntityDetails";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

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

  const selectedEntity = selectedDoctor || selectedProduct;
  const currentReviews = selectedDoctor 
    ? mockReviews[selectedDoctor.id] 
    : selectedProduct 
      ? mockReviews[selectedProduct.id] 
      : [];

  return (
    <div className="space-y-6">
      <SearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showProductReviews={showProductReviews}
        toggleReviewMode={toggleReviewMode}
      />

      <OrderInfoBanner orderInfo={orderInfo} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <EntityList 
            entities={showProductReviews ? filteredProducts : filteredDoctors}
            selectedEntity={selectedEntity}
            onSelectEntity={showProductReviews ? handleSelectProduct : handleSelectDoctor}
            entityType={showProductReviews ? "product" : "doctor"}
          />
        </div>

        <div className="md:col-span-2">
          {selectedEntity ? (
            <div>
              <EntityDetails 
                entity={selectedEntity} 
                onAddReview={handleAddReview} 
              />
              
              {showReviewForm ? (
                <ReviewForm 
                  entityId={selectedEntity.id}
                  entityName={selectedEntity.name}
                  entityType={selectedDoctor ? "doctor" : "product"}
                  onSubmit={handleReviewSubmit}
                  onCancel={() => setShowReviewForm(false)}
                />
              ) : (
                <ReviewList 
                  reviews={currentReviews || []}
                  noReviewsMessage="Aucun avis pour le moment"
                  onAddReview={handleAddReview}
                />
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
