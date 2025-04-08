
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useRegisterTranslation } from "@/hooks/useRegisterTranslation";
import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/types/user";
import AuthFields from "@/components/register/AuthFields";
import LocationSelect from "@/components/register/LocationSelect";
import ProfessionalFields from "@/components/register/ProfessionalFields";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register } = useUser();
  const t = useRegisterTranslation();

  // Registration type: patient or professional
  const [registrationType, setRegistrationType] = useState<UserRole>("patient");
  
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
  const handleSubmit = async (e: React.FormEvent) => {
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
    
    try {
      // Prepare user data
      const userData = {
        name: formData.fullName,
        email: formData.email,
        location: {
          region: formData.region,
          city: formData.city,
          address: formData.address
        },
        ...(registrationType === "professional" && {
          specialty: formData.specialty,
          license: formData.license
        })
      };
      
      // Register user
      await register(userData, formData.password, registrationType);
      
      // Show success
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Bienvenue!",
      });
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Échec de l'inscription",
        description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{t.pages.registration}</h1>
        
        <Tabs defaultValue="patient" onValueChange={(value) => setRegistrationType(value as UserRole)}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="patient">{t.forms.patientRegistration}</TabsTrigger>
            <TabsTrigger value="professional">{t.forms.professionalRegistration}</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            {/* Common auth fields (email, password, etc.) */}
            <AuthFields 
              formData={formData}
              handleChange={handleChange}
              translations={t.forms}
            />
            
            {/* Location fields */}
            <LocationSelect
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              translations={t.forms}
            />
            
            {/* Professional-specific fields */}
            {registrationType === "professional" && (
              <>
                <ProfessionalFields
                  formData={formData}
                  handleChange={handleChange}
                  translations={t.forms}
                />
                
                <div className="mb-4 mt-4 flex items-center">
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
              <Link to="/login" className="text-blue-600 hover:underline">
                {t.buttons.login}
              </Link>
            </p>
          </form>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Register;
