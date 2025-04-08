
import { toast as toastFunction } from "@/components/ui/use-toast";

export const usePaymentValidation = () => {
  const validatePayment = (
    method: "card" | "insurance" | "paypal" | "mobile" | "transfer" | "cod",
    cardNumber: string,
    cardHolder: string,
    expiryDate: string,
    cvv: string,
    insuranceProvider: string,
    policyNumber: string,
    mobileNumber: string
  ): boolean => {
    if (method === "card") {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length < 16) {
        toastFunction({
          variant: "destructive",
          title: "Numéro de carte invalide",
          description: "Veuillez saisir un numéro de carte valide",
        });
        return false;
      }
      
      if (!cardHolder.trim()) {
        toastFunction({
          variant: "destructive",
          title: "Titulaire de la carte manquant",
          description: "Veuillez saisir le nom du titulaire de la carte",
        });
        return false;
      }
      
      if (!expiryDate.trim() || !expiryDate.includes("/") || expiryDate.length < 5) {
        toastFunction({
          variant: "destructive",
          title: "Date d'expiration invalide",
          description: "Veuillez saisir une date d'expiration valide (MM/YY)",
        });
        return false;
      }
      
      if (!cvv.trim() || cvv.length < 3) {
        toastFunction({
          variant: "destructive",
          title: "CVV invalide",
          description: "Veuillez saisir un code de sécurité valide",
        });
        return false;
      }
    } else if (method === "insurance") {
      if (!insuranceProvider) {
        toastFunction({
          variant: "destructive",
          title: "Assureur manquant",
          description: "Veuillez sélectionner votre assureur",
        });
        return false;
      }
      
      if (!policyNumber.trim()) {
        toastFunction({
          variant: "destructive",
          title: "Numéro de police manquant",
          description: "Veuillez saisir votre numéro de police d'assurance",
        });
        return false;
      }
    } else if (method === "mobile") {
      if (!mobileNumber.trim() || mobileNumber.replace(/\s/g, "").length < 8) {
        toastFunction({
          variant: "destructive",
          title: "Numéro de téléphone invalide",
          description: "Veuillez saisir un numéro de téléphone valide",
        });
        return false;
      }
    }
    
    return true;
  };

  return { validatePayment };
};
