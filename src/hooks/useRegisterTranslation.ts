
import { useEffect, useState } from 'react';

interface RegisterTranslation {
  title: string;
  description: string;
  patientTab: string;
  professionalTab: string;
  submitButton: string;
  alreadyHaveAccount: string;
  loginLink: string;
  auth: {
    nameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    passwordMatchError: string;
  };
  location: {
    regionLabel: string;
    cityLabel: string;
    addressLabel: string;
  };
  professional: {
    specialtyLabel: string;
    licenseLabel: string;
  };
}

export const useRegisterTranslation = () => {
  // In a real app, this would be fetched from a translation service
  const register: RegisterTranslation = {
    title: "Créer un compte",
    description: "Rejoignez notre plateforme de santé pour accéder à tous nos services",
    patientTab: "Patient",
    professionalTab: "Professionnel de santé",
    submitButton: "S'inscrire",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    loginLink: "Se connecter",
    auth: {
      nameLabel: "Nom complet",
      emailLabel: "Email",
      passwordLabel: "Mot de passe",
      confirmPasswordLabel: "Confirmer le mot de passe",
      passwordMatchError: "Les mots de passe ne correspondent pas"
    },
    location: {
      regionLabel: "Région",
      cityLabel: "Ville",
      addressLabel: "Adresse"
    },
    professional: {
      specialtyLabel: "Spécialité",
      licenseLabel: "Numéro de licence"
    }
  };

  // These are added to match the expected properties in Register.tsx
  const forms = {
    fullName: "Nom complet",
    email: "Email",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    region: "Région",
    regionPlaceholder: "Sélectionnez votre région",
    city: "Ville",
    cityPlaceholder: "Sélectionnez votre ville",
    address: "Adresse",
    addressPlaceholder: "Votre adresse complète",
    location: "Localisation",
    specialty: "Spécialité",
    specialtyPlaceholder: "Votre spécialité médicale",
    license: "Numéro de licence",
    licensePlaceholder: "Votre numéro de licence professionnelle",
    professionalTerms: "J'accepte les conditions spécifiques aux professionnels de santé",
    patientRegistration: "Patient",
    professionalRegistration: "Professionnel de santé",
    alreadyHaveAccount: "Vous avez déjà un compte ?"
  };

  const buttons = {
    register: "S'inscrire",
    login: "Se connecter"
  };

  const pages = {
    registration: "Créer un compte"
  };

  return { register, forms, buttons, pages };
};
