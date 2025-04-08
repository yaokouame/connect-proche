
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import AuthFields from "@/components/register/AuthFields";
import LocationSelect from "@/components/register/LocationSelect";
import ProfessionalFields from "@/components/register/ProfessionalFields";
import { useRegisterTranslation } from "@/hooks/useRegisterTranslation";
import VoiceAssistant from "@/components/voice/VoiceAssistant";
import { Volume2, VolumeX } from "lucide-react";

const Register = () => {
  const t = useRegisterTranslation();
  
  // User state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState<UserRole>("patient");
  const [loading, setLoading] = useState(false);
  
  // Professional specific fields
  const [specialty, setSpecialty] = useState("");
  const [license, setLicense] = useState("");
  
  // Location fields
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  
  // Voice guidance state
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  
  const { register } = useUser();
  const navigate = useNavigate();

  // Check if passwords match whenever password or confirmPassword change
  useEffect(() => {
    setPasswordMatch(password === confirmPassword || confirmPassword === "");
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);
    setLoading(true);

    try {
      const userData = {
        name,
        email,
        role,
        location: {
          city,
          region,
          address
        },
        ...(role === "professional" && { specialty, license }),
      };
      await register(userData, password, role);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const speakFormInstructions = () => {
    if ('speechSynthesis' in window) {
      let instructions = '';
      
      if (role === "patient") {
        instructions = `Bienvenue sur la page d'inscription pour les patients. 
          Pour vous inscrire, vous devez renseigner votre nom complet, votre email, 
          votre mot de passe, le confirmer, puis indiquer votre région, votre ville et votre adresse. 
          Une fois les informations saisies, cliquez sur le bouton s'inscrire en bas du formulaire.`;
      } else {
        instructions = `Bienvenue sur la page d'inscription pour les professionnels de santé. 
          En plus des informations personnelles, vous devez également renseigner votre spécialité et 
          votre numéro de licence professionnelle. Remplissez tous les champs obligatoires puis 
          cliquez sur le bouton s'inscrire en bas du formulaire.`;
      }
      
      const utterance = new SpeechSynthesisUtterance(instructions);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const speakFieldInstructions = (fieldName: string) => {
    if ('speechSynthesis' in window) {
      let fieldText = "";
      
      switch(fieldName) {
        case "name":
          fieldText = "Veuillez saisir votre nom complet, par exemple Jean Dupont";
          break;
        case "email":
          fieldText = "Veuillez saisir votre adresse email, par exemple jean.dupont@example.com";
          break;
        case "password":
          fieldText = "Veuillez choisir un mot de passe sécurisé. Il est recommandé d'utiliser des lettres majuscules, minuscules, des chiffres et des caractères spéciaux";
          break;
        case "confirmPassword":
          fieldText = "Veuillez saisir à nouveau votre mot de passe pour confirmation";
          break;
        case "region":
          fieldText = "Veuillez sélectionner votre région";
          break;
        case "city":
          fieldText = "Veuillez sélectionner votre ville";
          break;
        case "address":
          fieldText = "Veuillez saisir votre adresse complète";
          break;
        case "specialty":
          fieldText = "Veuillez sélectionner votre spécialité médicale";
          break;
        case "license":
          fieldText = "Veuillez saisir votre numéro de licence professionnelle";
          break;
        default:
          fieldText = "Veuillez remplir ce champ";
      }
      
      const utterance = new SpeechSynthesisUtterance(fieldText);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center py-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center relative">
            <div className="absolute right-2 top-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowVoiceHelp(!showVoiceHelp)}
                title={showVoiceHelp ? "Désactiver l'assistance vocale" : "Activer l'assistance vocale"}
              >
                {showVoiceHelp ? (
                  <Volume2 className="h-5 w-5 text-health-blue" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold text-health-blue">{t.register}</CardTitle>
            <CardDescription>
              {t.createAccount}
            </CardDescription>
            {showVoiceHelp && (
              <div className="mt-2 flex justify-center">
                <Button 
                  onClick={() => speakFormInstructions()} 
                  variant="outline" 
                  size="sm" 
                  className="text-sm flex items-center gap-2"
                >
                  <Volume2 className="h-4 w-4" /> 
                  Écouter les instructions
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="w-full" onValueChange={(val) => setRole(val as UserRole)}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="patient">{t.patient}</TabsTrigger>
                <TabsTrigger value="professional">{t.professional}</TabsTrigger>
              </TabsList>
              <form onSubmit={handleSubmit} className="space-y-4">
                <AuthFields
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  passwordMatch={passwordMatch}
                  translations={t}
                  showVoiceHelp={showVoiceHelp}
                  onSpeakField={speakFieldInstructions}
                />
                
                <LocationSelect
                  region={region}
                  setRegion={setRegion}
                  city={city}
                  setCity={setCity}
                  address={address}
                  setAddress={setAddress}
                  translations={t}
                  showVoiceHelp={showVoiceHelp}
                  onSpeakField={speakFieldInstructions}
                />
                
                <TabsContent value="professional">
                  <ProfessionalFields
                    specialty={specialty}
                    setSpecialty={setSpecialty}
                    license={license}
                    setLicense={setLicense}
                    translations={t}
                    showVoiceHelp={showVoiceHelp}
                    onSpeakField={speakFieldInstructions}
                  />
                </TabsContent>
                
                <Button
                  type="submit"
                  className="w-full bg-health-blue hover:bg-health-teal"
                  disabled={loading}
                >
                  {loading ? t.creatingAccount : t.signUp}
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              {t.alreadyRegistered}{" "}
              <Link to="/login" className="text-health-blue hover:underline">
                {t.logIn}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
