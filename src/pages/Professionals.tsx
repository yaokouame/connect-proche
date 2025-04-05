
import React, { useState } from "react";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, Mail, MessageSquare, Video, PhoneCall } from "lucide-react";
import { Professional } from "@/types/user";
import { useNavigate } from "react-router-dom";

const Professionals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const navigate = useNavigate();

  // Liste des spécialités pour le filtrage
  const specialties = [
    "Médecin généraliste",
    "Cardiologue",
    "Dermatologue",
    "Pédiatre",
    "Psychiatre",
    "Neurologue",
    "Ophtalmologue",
    "Dentiste",
    "Kinésithérapeute",
    "Infirmier"
  ];

  // Données de démonstration pour les professionnels de santé
  const professionals: Professional[] = [
    {
      id: "prof1",
      name: "Dr. Sophie Laurent",
      specialty: "Médecin généraliste",
      location: "Paris, 75008",
      photoUrl: "",
      rating: 4.8,
      reviewCount: 124,
      availability: [
        { day: "Lundi", slots: ["9:00", "10:00", "14:00", "15:00"] },
        { day: "Mardi", slots: ["9:00", "10:00", "14:00", "15:00"] },
        { day: "Jeudi", slots: ["9:00", "10:00", "14:00", "15:00"] }
      ],
      phone: "01 23 45 67 89",
      email: "dr.laurent@example.com",
      languages: ["Français", "Anglais"],
      consultationTypes: ["Présentiel", "Vidéo", "Téléphone"]
    },
    {
      id: "prof2",
      name: "Dr. Thomas Benoit",
      specialty: "Cardiologue",
      location: "Lyon, 69002",
      photoUrl: "",
      rating: 4.9,
      reviewCount: 87,
      availability: [
        { day: "Lundi", slots: ["8:00", "9:00", "10:00"] },
        { day: "Mercredi", slots: ["14:00", "15:00", "16:00"] },
        { day: "Vendredi", slots: ["8:00", "9:00", "10:00"] }
      ],
      phone: "04 56 78 90 12",
      email: "dr.benoit@example.com",
      languages: ["Français", "Espagnol"],
      consultationTypes: ["Présentiel", "Téléphone"]
    },
    {
      id: "prof3",
      name: "Dr. Marie Dubois",
      specialty: "Dermatologue",
      location: "Marseille, 13006",
      photoUrl: "",
      rating: 4.7,
      reviewCount: 62,
      availability: [
        { day: "Mardi", slots: ["9:00", "10:00", "11:00"] },
        { day: "Jeudi", slots: ["14:00", "15:00", "16:00"] }
      ],
      phone: "04 91 23 45 67",
      email: "dr.dubois@example.com",
      languages: ["Français", "Anglais", "Allemand"],
      consultationTypes: ["Présentiel", "Vidéo"]
    },
    {
      id: "prof4",
      name: "Dr. Jean Martin",
      specialty: "Pédiatre",
      location: "Bordeaux, 33000",
      photoUrl: "",
      rating: 4.9,
      reviewCount: 103,
      availability: [
        { day: "Lundi", slots: ["9:00", "10:00", "11:00"] },
        { day: "Mercredi", slots: ["14:00", "15:00", "16:00"] },
        { day: "Vendredi", slots: ["9:00", "10:00", "11:00"] }
      ],
      phone: "05 56 78 90 12",
      email: "dr.martin@example.com",
      languages: ["Français"],
      consultationTypes: ["Présentiel", "Vidéo", "Téléphone"]
    },
    {
      id: "prof5",
      name: "Dr. Claire Moreau",
      specialty: "Psychiatre",
      location: "Lille, 59000",
      photoUrl: "",
      rating: 4.6,
      reviewCount: 78,
      availability: [
        { day: "Mardi", slots: ["14:00", "15:00", "16:00"] },
        { day: "Jeudi", slots: ["14:00", "15:00", "16:00"] }
      ],
      phone: "03 20 12 34 56",
      email: "dr.moreau@example.com",
      languages: ["Français", "Anglais"],
      consultationTypes: ["Présentiel", "Vidéo"]
    }
  ];

  // Filtrage des professionnels en fonction de la recherche et de la spécialité sélectionnée
  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        prof.specialty.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        prof.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty ? prof.specialty === selectedSpecialty : true;
    
    return matchesSearch && matchesSpecialty;
  });

  // Navigation vers la page de chat avec le professionnel
  const handleContactProfessional = (professionalId: string) => {
    navigate(`/chat?contact=${professionalId}`);
  };

  // Gestion du clic sur une spécialité
  const handleSpecialtyClick = (specialty: string) => {
    if (selectedSpecialty === specialty) {
      setSelectedSpecialty(null);
    } else {
      setSelectedSpecialty(specialty);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2 text-health-blue">Professionnels de santé</h1>
        <p className="text-gray-600 mb-8">Trouvez et contactez les professionnels de santé dont vous avez besoin</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher par nom, spécialité ou lieu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <Tabs defaultValue="specialty">
              <TabsList className="w-full">
                <TabsTrigger value="specialty" className="flex-1">Spécialité</TabsTrigger>
                <TabsTrigger value="location" className="flex-1">Lieu</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filtres sur le côté gauche */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Spécialités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {specialties.map(specialty => (
                    <Button
                      key={specialty}
                      variant={selectedSpecialty === specialty ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleSpecialtyClick(specialty)}
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Types de consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <span className="mr-2">🏥</span> Présentiel
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="h-4 w-4 mr-2" /> Vidéo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PhoneCall className="h-4 w-4 mr-2" /> Téléphone
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Liste des professionnels */}
          <div className="md:col-span-3">
            {filteredProfessionals.length > 0 ? (
              <div className="space-y-4">
                {filteredProfessionals.map(professional => (
                  <Card key={professional.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={professional.photoUrl} alt={professional.name} />
                            <AvatarFallback className="text-xl">
                              {professional.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="flex-grow space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h2 className="text-xl font-bold">{professional.name}</h2>
                              <p className="text-gray-600">{professional.specialty}</p>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0">
                              <span className="text-yellow-500 font-bold mr-1">{professional.rating}</span>
                              <span className="text-yellow-500">★</span>
                              <span className="text-gray-500 text-sm ml-1">({professional.reviewCount} avis)</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {professional.location}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {professional.phone}
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {professional.email}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {professional.languages.map(language => (
                              <Badge key={language} variant="outline" className="bg-gray-100">
                                {language}
                              </Badge>
                            ))}
                            {professional.consultationTypes.map(type => (
                              <Badge key={type} className="bg-health-blue/10 text-health-blue">
                                {type}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 items-center pt-2">
                            <Button 
                              variant="default" 
                              size="sm"
                              className="bg-health-blue hover:bg-health-teal"
                              onClick={() => handleContactProfessional(professional.id)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contacter
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Prendre rendez-vous
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Consultation vidéo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600">Aucun professionnel ne correspond à votre recherche.</p>
                <p className="text-gray-600 mt-2">Essayez de modifier vos critères.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Professionals;
