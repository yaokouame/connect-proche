
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
    "professionals.filters.languages": "Langues parlées",
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
    
    // Medical Record page
    "medical.bloodType": "Groupe sanguin",
    "medical.history": "Antécédents médicaux",
    "medical.medications": "Médicaments actuels",
    "medical.allergies": "Allergies connues",
    "medical.vaccinations": "Vaccinations",
    "medical.emergency": "Contact d'urgence",
    "medical.share": "Partage sécurisé",
    "medical.addVaccination": "Ajouter une vaccination",
    "medical.editVaccination": "Modifier la vaccination",
    "medical.noVaccinations": "Aucune vaccination enregistrée",
    "medical.vaccineName": "Nom du vaccin",
    "medical.vaccineDate": "Date de vaccination",
    "medical.vaccineExpiry": "Date d'expiration",
    "medical.vaccineProvider": "Prestataire",
    "medical.vaccineBatch": "Numéro de lot",
    "medical.vaccineNotes": "Notes",
    "medical.emergencyContact": "Contact d'urgence",
    "medical.contactName": "Nom et prénom",
    "medical.contactRelationship": "Relation",
    "medical.contactPhone": "Téléphone",
    "medical.contactEmail": "Email",
    "medical.shareSecure": "Partage sécurisé du dossier",
    "medical.shareDescription": "Partagez votre dossier médical de manière sécurisée avec un professionnel de santé via un QR code ou un lien temporaire.",
    "medical.shareGenerate": "Générer le partage",
  },
  en: {
    // Professionals page
    "professionals.title": "Healthcare Professionals",
    "professionals.subtitle": "Find and contact the healthcare professionals you need",
    "professionals.search.placeholder": "Search by name, specialty or location...",
    "professionals.filters.specialties": "Specialties",
    "professionals.filters.consultationTypes": "Consultation Types",
    "professionals.filters.languages": "Spoken Languages",
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
    
    // Medical Record page
    "medical.bloodType": "Blood Type",
    "medical.history": "Medical History",
    "medical.medications": "Current Medications",
    "medical.allergies": "Known Allergies",
    "medical.vaccinations": "Vaccinations",
    "medical.emergency": "Emergency Contact",
    "medical.share": "Secure Sharing",
    "medical.addVaccination": "Add vaccination",
    "medical.editVaccination": "Edit vaccination",
    "medical.noVaccinations": "No vaccinations recorded",
    "medical.vaccineName": "Vaccine name",
    "medical.vaccineDate": "Vaccination date",
    "medical.vaccineExpiry": "Expiry date",
    "medical.vaccineProvider": "Provider",
    "medical.vaccineBatch": "Batch number",
    "medical.vaccineNotes": "Notes",
    "medical.emergencyContact": "Emergency Contact",
    "medical.contactName": "Full name",
    "medical.contactRelationship": "Relationship",
    "medical.contactPhone": "Phone",
    "medical.contactEmail": "Email",
    "medical.shareSecure": "Secure Medical Record Sharing",
    "medical.shareDescription": "Share your medical record securely with a healthcare professional via QR code or temporary link.",
    "medical.shareGenerate": "Generate sharing",
  },
  es: {
    // Professionals page
    "professionals.title": "Profesionales de la salud",
    "professionals.subtitle": "Encuentra y contacta con los profesionales de la salud que necesitas",
    "professionals.search.placeholder": "Buscar por nombre, especialidad o ubicación...",
    "professionals.filters.specialties": "Especialidades",
    "professionals.filters.consultationTypes": "Tipos de consulta",
    "professionals.filters.languages": "Idiomas hablados",
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
    
    // Medical Record page
    "medical.bloodType": "Grupo sanguíneo",
    "medical.history": "Historial médico",
    "medical.medications": "Medicamentos actuales",
    "medical.allergies": "Alergias conocidas",
    "medical.vaccinations": "Vacunas",
    "medical.emergency": "Contacto de emergencia",
    "medical.share": "Compartir seguro",
    "medical.addVaccination": "Añadir vacuna",
    "medical.editVaccination": "Editar vacuna",
    "medical.noVaccinations": "No hay vacunas registradas",
    "medical.vaccineName": "Nombre de la vacuna",
    "medical.vaccineDate": "Fecha de vacunación",
    "medical.vaccineExpiry": "Fecha de caducidad",
    "medical.vaccineProvider": "Proveedor",
    "medical.vaccineBatch": "Número de lote",
    "medical.vaccineNotes": "Notas",
    "medical.emergencyContact": "Contacto de emergencia",
    "medical.contactName": "Nombre completo",
    "medical.contactRelationship": "Relación",
    "medical.contactPhone": "Teléfono",
    "medical.contactEmail": "Correo electrónico",
    "medical.shareSecure": "Compartir historial médico de forma segura",
    "medical.shareDescription": "Comparte tu historial médico de forma segura con un profesional de la salud mediante código QR o enlace temporal.",
    "medical.shareGenerate": "Generar compartición",
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
