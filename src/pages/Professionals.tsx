
import React from "react";
import Layout from "@/components/Layout";
import { useProfessionals } from "@/hooks/useProfessionals";
import ProfessionalsFilters from "@/components/professionals/ProfessionalsFilters";
import ProfessionalsSearch from "@/components/professionals/ProfessionalsSearch";
import ProfessionalsList from "@/components/professionals/ProfessionalsList";
import { Professional } from "@/types/user";
import { useLanguage } from "@/contexts/LanguageContext";

const ProfessionalsPage = () => {
  const { t } = useLanguage();
  
  // This would typically come from an API in a real application
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
  
  const {
    searchQuery,
    setSearchQuery,
    selectedSpecialties,
    selectedLocations,
    specialties,
    locations,
    handleSpecialtyChange,
    handleLocationChange,
    filteredProfessionals
  } = useProfessionals(professionals);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">{t('professionals.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <ProfessionalsFilters
              specialties={specialties}
              locations={locations}
              selectedSpecialties={selectedSpecialties}
              selectedLocations={selectedLocations}
              onSpecialtyChange={handleSpecialtyChange}
              onLocationChange={handleLocationChange}
            />
          </div>
          
          <div className="md:col-span-3">
            <ProfessionalsSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <ProfessionalsList professionals={filteredProfessionals} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalsPage;
