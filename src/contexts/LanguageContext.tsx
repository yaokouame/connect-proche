
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'fr' | 'en' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations for each language
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Professionals page
    "professionals.title": "Professionnels de santé",
    "professionals.subtitle": "Trouvez et contactez les professionnels de santé dont vous avez besoin",
    "professionals.search.placeholder": "Rechercher par nom, spécialité ou lieu...",
    "professionals.filters.specialties": "Spécialités",
    "professionals.filters.consultationTypes": "Types de consultation",
    "professionals.filters.inPerson": "Présentiel",
    "professionals.filters.video": "Vidéo",
    "professionals.filters.phone": "Téléphone",
    "professionals.contact": "Contacter",
    "professionals.appointment": "Prendre rendez-vous",
    "professionals.videoConsultation": "Consultation vidéo",
    "professionals.noResults": "Aucun professionnel ne correspond à votre recherche.",
    "professionals.tryAgain": "Essayez de modifier vos critères.",
    "professionals.specialty": "Spécialité",
    "professionals.location": "Lieu",
  },
  en: {
    // Professionals page
    "professionals.title": "Healthcare Professionals",
    "professionals.subtitle": "Find and contact the healthcare professionals you need",
    "professionals.search.placeholder": "Search by name, specialty or location...",
    "professionals.filters.specialties": "Specialties",
    "professionals.filters.consultationTypes": "Consultation Types",
    "professionals.filters.inPerson": "In Person",
    "professionals.filters.video": "Video",
    "professionals.filters.phone": "Phone",
    "professionals.contact": "Contact",
    "professionals.appointment": "Make appointment",
    "professionals.videoConsultation": "Video consultation",
    "professionals.noResults": "No professionals match your search.",
    "professionals.tryAgain": "Try modifying your criteria.",
    "professionals.specialty": "Specialty",
    "professionals.location": "Location",
  },
  es: {
    // Professionals page
    "professionals.title": "Profesionales de la salud",
    "professionals.subtitle": "Encuentra y contacta con los profesionales de la salud que necesitas",
    "professionals.search.placeholder": "Buscar por nombre, especialidad o ubicación...",
    "professionals.filters.specialties": "Especialidades",
    "professionals.filters.consultationTypes": "Tipos de consulta",
    "professionals.filters.inPerson": "Presencial",
    "professionals.filters.video": "Vídeo",
    "professionals.filters.phone": "Teléfono",
    "professionals.contact": "Contactar",
    "professionals.appointment": "Pedir cita",
    "professionals.videoConsultation": "Consulta por vídeo",
    "professionals.noResults": "Ningún profesional coincide con tu búsqueda.",
    "professionals.tryAgain": "Intenta modificar tus criterios.",
    "professionals.specialty": "Especialidad",
    "professionals.location": "Ubicación",
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
