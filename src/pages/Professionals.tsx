
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Professional } from "@/types/user";
import { Star, MapPin, Clock, CheckCircle, Filter, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProfessionalsPage = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  const professionals: Professional[] = [
    {
      id: "1",
      name: "Dr. Konan Kouassi",
      specialty: "Cardiologue",
      profileImage: "/placeholder.svg",
      verified: true,
      rating: 4.8,
      reviewCount: 124,
      experience: 12,
      location: "Abidjan - Cocody",
      availableSlots: ["Lundi 10:00", "Mardi 14:00", "Jeudi 09:00"],
      fees: {
        consultation: 15000,
        followUp: 10000,
      },
      acceptedInsuranceProviders: ["MUGEFCI", "CNPS", "CMU"],
      bio: "Spécialiste en cardiologie interventionnelle et préventive.",
      education: ["Université Félix Houphouët-Boigny", "CHU de Treichville"],
      languages: ["Français", "Anglais", "Baoulé"],
      phone: "+225 07 07 07 07 07",
      email: "dr.konan@cardio.ci",
      consultationTypes: ["En personne", "Téléconsultation"]
    },
    {
      id: "2",
      name: "Dr. Aya Brou",
      specialty: "Dermatologue",
      profileImage: "/placeholder.svg",
      verified: true,
      rating: 4.6,
      reviewCount: 98,
      experience: 8,
      location: "Abidjan - Plateau",
      availableSlots: ["Lundi 11:00", "Mercredi 14:00", "Vendredi 16:00"],
      fees: {
        consultation: 12000,
        followUp: 8000,
      },
      acceptedInsuranceProviders: ["MUGEFCI", "CMU"],
      bio: "Spécialiste en dermatologie esthétique et médicale.",
      education: ["Université Félix Houphouët-Boigny", "CHU de Treichville"],
      languages: ["Français", "Anglais"],
      consultationTypes: ["En personne"]
    },
    {
      id: "3",
      name: "Dr. Marie Koffi",
      specialty: "Pédiatre",
      profileImage: "/placeholder.svg",
      verified: true,
      rating: 4.9,
      reviewCount: 156,
      experience: 15,
      location: "Abidjan - Yopougon",
      availableSlots: ["Mardi 09:00", "Jeudi 14:00", "Vendredi 10:00"],
      fees: {
        consultation: 10000,
        followUp: 7000,
      },
      acceptedInsuranceProviders: ["MUGEFCI", "CNPS", "CMU"],
      bio: "Spécialiste en pédiatrie générale et développement de l'enfant.",
      education: ["Université Félix Houphouët-Boigny", "CHU de Yopougon"],
      languages: ["Français", "Anglais", "Dioula"],
      phone: "+225 05 05 05 05 05",
      consultationTypes: ["En personne", "Téléconsultation", "Visite à domicile"]
    },
    {
      id: "4",
      name: "Dr. Thomas N'Guessan",
      specialty: "Psychiatre",
      profileImage: "/placeholder.svg",
      verified: false,
      rating: 4.5,
      reviewCount: 87,
      experience: 6,
      location: "Abidjan - Marcory",
      availableSlots: ["Lundi 16:00", "Mercredi 10:00", "Jeudi 17:00"],
      fees: {
        consultation: 20000,
        followUp: 15000,
      },
      acceptedInsuranceProviders: ["MUGEFCI", "CNPS"],
      bio: "Spécialiste en psychiatrie pour adultes et thérapie cognitive.",
      education: ["Université Félix Houphouët-Boigny", "CHU de Cocody"],
      languages: ["Français", "Anglais"],
      email: "dr.nguessan@psy.ci",
      consultationTypes: ["En personne", "Téléconsultation"]
    },
    {
      id: "5",
      name: "Dr. Claire Yao",
      specialty: "Ophtalmologue",
      profileImage: "/placeholder.svg",
      verified: true,
      rating: 4.7,
      reviewCount: 110,
      experience: 10,
      location: "Abidjan - Treichville",
      availableSlots: ["Mardi 11:00", "Jeudi 09:00", "Vendredi 14:00"],
      fees: {
        consultation: 15000,
        followUp: 10000,
      },
      acceptedInsuranceProviders: ["MUGEFCI", "CNPS", "CMU"],
      bio: "Spécialiste en ophtalmologie pédiatrique et chirurgie réfractive.",
      education: ["Université Félix Houphouët-Boigny", "CHU de Cocody"],
      languages: ["Français", "Anglais"],
      phone: "+225 01 01 01 01 01",
      email: "dr.yao@ophtalmo.ci",
      consultationTypes: ["En personne"]
    }
  ];
  
  const specialties = Array.from(
    new Set(professionals.map((pro) => pro.specialty))
  );
  
  const locations = Array.from(
    new Set(professionals.map((pro) => pro.location))
  );
  
  const handleSpecialtyChange = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };
  
  const handleLocationChange = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };
  
  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pro.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialties.length === 0 || 
                           selectedSpecialties.includes(pro.specialty);
    
    const matchesLocation = selectedLocations.length === 0 || 
                          selectedLocations.includes(pro.location);
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  // Fonction pour formater les prix en F CFA
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CI', { 
      style: 'currency', 
      currency: 'XOF',
      maximumFractionDigits: 0,
      currencyDisplay: 'code'
    }).format(price).replace('XOF', 'F CFA');
  };

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">{t('professionals.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" />
                <h2 className="font-semibold">{t('common.filter')}</h2>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">{t('professionals.specialty')}</h3>
                <div className="space-y-2">
                  {specialties.map((specialty) => (
                    <div key={specialty} className="flex items-center">
                      <Checkbox
                        id={`specialty-${specialty}`}
                        checked={selectedSpecialties.includes(specialty)}
                        onCheckedChange={() => handleSpecialtyChange(specialty)}
                      />
                      <label
                        htmlFor={`specialty-${specialty}`}
                        className="ml-2 text-sm"
                      >
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">{t('professionals.location')}</h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <div key={location} className="flex items-center">
                      <Checkbox
                        id={`location-${location}`}
                        checked={selectedLocations.includes(location)}
                        onCheckedChange={() => handleLocationChange(location)}
                      />
                      <label
                        htmlFor={`location-${location}`}
                        className="ml-2 text-sm"
                      >
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('professionals.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredProfessionals.length > 0 ? (
                filteredProfessionals.map((pro) => (
                  <Card key={pro.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 mx-auto md:mx-0">
                          <img
                            src={pro.profileImage}
                            alt={pro.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow space-y-2">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="text-xl font-semibold flex items-center">
                                {pro.name}
                                {pro.verified && (
                                  <CheckCircle className="h-4 w-4 text-blue-500 ml-2" />
                                )}
                              </h3>
                              <p className="text-gray-600">{pro.specialty}</p>
                            </div>
                            
                            <div className="flex items-center mt-2 md:mt-0">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="font-medium">{pro.rating}</span>
                              <span className="text-gray-500 text-sm ml-1">
                                ({pro.reviewCount} avis)
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                              <span>{pro.location}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <span>{pro.experience} ans d'expérience</span>
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <p className="text-sm text-gray-500 mb-2">Prochaines disponibilités:</p>
                            <div className="flex flex-wrap gap-2">
                              {pro.availableSlots?.map((slot, idx) => (
                                <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                                  {slot}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Consultation: <span className="font-medium text-gray-900">{formatPrice(pro.fees?.consultation)}</span>
                        </p>
                      </div>
                      <Button>{t('professionals.appointment')}</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">{t('professionals.noResults')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalsPage;
