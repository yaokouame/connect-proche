
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search, PlusCircle } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
}

interface Review {
  id: string;
  doctorId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const DoctorReviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Mock data for doctors and reviews
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
    ]
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleAddReview = () => {
    if (!selectedDoctor) {
      toast({
        title: "Aucun médecin sélectionné",
        description: "Veuillez d'abord sélectionner un médecin.",
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
  };

  const filteredDoctors = mockDoctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
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
          <CardTitle>Rechercher un médecin ou un établissement</CardTitle>
          <CardDescription>
            Trouvez et partagez des avis sur les professionnels de santé
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Nom, spécialité ou ville..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="font-semibold mb-4 text-lg">Médecins</h2>
          <div className="space-y-3">
            {filteredDoctors.map((doctor) => (
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
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedDoctor ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">{selectedDoctor.name}</h2>
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
                      {selectedDoctor.rating}
                      <span className="text-sm font-normal text-muted-foreground ml-1">/5</span>
                    </div>
                    <div className="flex">{renderStars(selectedDoctor.rating)}</div>
                    <div className="text-sm text-muted-foreground">
                      Basé sur {selectedDoctor.reviewCount} avis
                    </div>
                  </div>
                </CardContent>
              </Card>

              {showReviewForm ? (
                <ReviewForm 
                  doctorId={selectedDoctor.id}
                  doctorName={selectedDoctor.name}
                  onSubmit={handleReviewSubmit}
                  onCancel={() => setShowReviewForm(false)}
                />
              ) : (
                <div className="space-y-4">
                  {mockReviews[selectedDoctor.id]?.map(review => (
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
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 text-center text-muted-foreground">
              <div>
                <p>Sélectionnez un médecin pour voir les avis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorReviews;
