
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationSelect from "@/components/register/LocationSelect";
import ProfessionalFields from "@/components/register/ProfessionalFields";
import AuthFields from "@/components/register/AuthFields";
import { useRegisterTranslation } from "@/hooks/useRegisterTranslation";
import PageVoiceHelp from "@/components/voice/PageVoiceHelp";

const Register = () => {
  const { register: t } = useRegisterTranslation();
  const [accountType, setAccountType] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [license, setLicense] = useState("");
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);

  const fieldInstructions = useMemo(() => ({
    name: "Veuillez entrer votre nom complet.",
    email: "Veuillez entrer votre adresse email. Cette adresse sera utilisée pour vous connecter et pour les communications importantes.",
    password: "Choisissez un mot de passe sécurisé d'au moins 8 caractères, contenant des lettres majuscules, minuscules et des chiffres.",
    confirmPassword: "Veuillez confirmer votre mot de passe en le saisissant une seconde fois pour éviter les erreurs.",
    specialty: "Si vous êtes professionnel de santé, veuillez sélectionner votre spécialité dans la liste déroulante.",
    license: "Veuillez entrer votre numéro de licence ou d'identification professionnelle."
  }), []);

  useEffect(() => {
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMatch) {
      return;
    }
    
    console.log({
      accountType,
      name,
      email,
      password,
      region,
      city,
      address,
      specialty,
      license,
    });
    
    // Dans une véritable application, cela enverrait les données au serveur
  };

  const handleSpeakField = useCallback((fieldName: string) => {
    if (fieldInstructions[fieldName as keyof typeof fieldInstructions]) {
      const text = fieldInstructions[fieldName as keyof typeof fieldInstructions];
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [fieldInstructions]);

  const toggleVoiceHelp = useCallback(() => {
    setShowVoiceHelp(!showVoiceHelp);
  }, [showVoiceHelp]);

  const pageDescription = "Page d'inscription. Ici, vous pouvez créer un compte en tant que patient ou professionnel de santé. Remplissez les champs obligatoires comme votre nom, email et mot de passe. Si vous êtes un professionnel de santé, vous devrez également indiquer votre spécialité et votre numéro de licence.";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.title}</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleVoiceHelp}
              className="text-health-blue"
            >
              {showVoiceHelp ? "Désactiver l'aide vocale" : "Activer l'aide vocale"}
            </Button>
          </div>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <Tabs value={accountType} onValueChange={setAccountType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">{t.patientTab}</TabsTrigger>
              <TabsTrigger value="professional">{t.professionalTab}</TabsTrigger>
            </TabsList>

            <CardContent className="space-y-4 mt-4">
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
                translations={t.auth}
                showVoiceHelp={showVoiceHelp}
                onSpeakField={handleSpeakField}
              />

              <LocationSelect
                region={region}
                setRegion={setRegion}
                city={city}
                setCity={setCity}
                address={address}
                setAddress={setAddress}
                translations={t.location}
              />

              {accountType === "professional" && (
                <ProfessionalFields
                  specialty={specialty}
                  setSpecialty={setSpecialty}
                  license={license}
                  setLicense={setLicense}
                  translations={t.professional}
                  showVoiceHelp={showVoiceHelp}
                  onSpeakField={handleSpeakField}
                />
              )}
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full mb-4">{t.submitButton}</Button>
              <p className="text-sm text-center text-gray-500">
                {t.alreadyHaveAccount}{" "}
                <Link to="/login" className="text-health-blue hover:underline">
                  {t.loginLink}
                </Link>
              </p>
            </CardFooter>
          </Tabs>
        </form>
      </Card>
      
      <PageVoiceHelp 
        pageDescription={pageDescription}
        instructions={fieldInstructions}
        position="bottom-right"
        className="hidden md:block"
      />
    </div>
  );
};

export default Register;
