
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

  return { register };
};
