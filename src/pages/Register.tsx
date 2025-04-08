
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useRegisterTranslation } from "@/hooks/useRegisterTranslation";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AuthFields from "@/components/register/AuthFields";
import LocationSelect from "@/components/register/LocationSelect";
import ProfessionalFields from "@/components/register/ProfessionalFields";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const t = useRegisterTranslation();

  // Registration type: patient or professional
  const [registrationType, setRegistrationType] = useState<"patient" | "professional">("patient");
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    region: "",
    city: "",
    address: "",
    specialty: "",
    license: "",
    terms: false
  });
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  // Handle select field changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate password strength (simple example)
    if (formData.password.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate terms for professionals
    if (registrationType === "professional" && !formData.terms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation pour les professionnels.",
        variant: "destructive",
      });
      return;
    }
    
    // Here would normally be API calls to register the user
    
    // Show success and redirect
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès.",
    });
    
    // Redirect to login
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  
  // Translation objects for components
  // Creating these objects with appropriate properties to match expected types
  const authFieldsTranslations = {
    fullName: t.forms.fullName,
    email: t.forms.email,
    password: t.forms.password,
    confirmPassword: t.forms.confirmPassword,
    passwordMismatch: t.forms.passwordMismatch
  };
  
  const locationTranslations = {
    region: t.forms.region,
    regionPlaceholder: t.forms.regionPlaceholder,
    city: t.forms.city, 
    cityPlaceholder: t.forms.cityPlaceholder,
    address: t.forms.address,
    addressPlaceholder: t.forms.addressPlaceholder,
    location: t.forms.location
  };
  
  const professionalTranslations = {
    specialty: t.forms.specialty,
    specialtyPlaceholder: t.forms.specialtyPlaceholder,
    license: t.forms.license,
    licensePlaceholder: t.forms.licensePlaceholder
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t.pages.registration}</h1>
        
        <Tabs defaultValue="patient" onValueChange={(value) => setRegistrationType(value as "patient" | "professional")}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="patient">{t.forms.patientRegistration}</TabsTrigger>
            <TabsTrigger value="professional">{t.forms.professionalRegistration}</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            {/* Common auth fields (email, password, etc.) */}
            <AuthFields 
              formData={formData}
              handleChange={handleChange}
              translations={authFieldsTranslations}
            />
            
            {/* Location fields */}
            <LocationSelect
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              translations={locationTranslations}
            />
            
            {/* Professional-specific fields */}
            {registrationType === "professional" && (
              <>
                <ProfessionalFields
                  formData={formData}
                  handleChange={handleChange}
                  translations={professionalTranslations}
                />
                
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <Label htmlFor="terms" className="text-sm">
                    {t.forms.professionalTerms}
                  </Label>
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full mt-6">
              {t.buttons.register}
            </Button>
            
            <p className="text-center mt-4 text-sm">
              {t.forms.alreadyHaveAccount}{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                {t.buttons.login}
              </a>
            </p>
          </form>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Register;
