
import { useLanguage } from "@/contexts/LanguageContext";

export const useRegisterTranslation = () => {
  const { language } = useLanguage();

  const getTranslation = () => {
    if (language === 'fr') {
      return {
        register: "Inscription",
        createAccount: "Créez votre compte pour accéder à tous nos services",
        patient: "Patient",
        professional: "Professionnel de santé",
        fullName: "Nom complet",
        email: "Email",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        passwordMismatch: "Les mots de passe ne correspondent pas",
        specialty: "Spécialité",
        specialtyPlaceholder: "Sélectionnez votre spécialité",
        license: "Numéro de licence professionnelle",
        licensePlaceholder: "ex: 12345678",
        location: "Localisation",
        city: "Ville",
        cityPlaceholder: "Sélectionnez votre ville",
        region: "Région",
        regionPlaceholder: "Sélectionnez votre région",
        address: "Adresse",
        addressPlaceholder: "Adresse complète",
        creatingAccount: "Création du compte...",
        signUp: "S'inscrire",
        alreadyRegistered: "Déjà inscrit?",
        logIn: "Se connecter",
        selectOption: "Sélectionnez une option"
      };
    } else {
      return {
        register: "Registration",
        createAccount: "Create your account to access all our services",
        patient: "Patient",
        professional: "Healthcare Professional",
        fullName: "Full Name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        passwordMismatch: "Passwords don't match",
        specialty: "Specialty",
        specialtyPlaceholder: "Select your specialty",
        license: "Professional License Number",
        licensePlaceholder: "ex: 12345678",
        location: "Location",
        city: "City",
        cityPlaceholder: "Select your city",
        region: "Region",
        regionPlaceholder: "Select your region",
        address: "Address",
        addressPlaceholder: "Full address",
        creatingAccount: "Creating account...",
        signUp: "Sign Up",
        alreadyRegistered: "Already registered?",
        logIn: "Log In",
        selectOption: "Select an option"
      };
    }
  };

  return getTranslation();
};
