
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const Register = () => {
  const { language } = useLanguage();
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
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  
  const { register } = useUser();
  const navigate = useNavigate();

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
        specialtyPlaceholder: "ex: Cardiologue, Infirmier, Dentiste...",
        license: "Numéro de licence professionnelle",
        licensePlaceholder: "ex: 12345678",
        location: "Localisation",
        city: "Ville",
        region: "Région",
        address: "Adresse",
        addressPlaceholder: "Adresse complète",
        creatingAccount: "Création du compte...",
        signUp: "S'inscrire",
        alreadyRegistered: "Déjà inscrit?",
        logIn: "Se connecter"
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
        specialtyPlaceholder: "ex: Cardiologist, Nurse, Dentist...",
        license: "Professional License Number",
        licensePlaceholder: "ex: 12345678",
        location: "Location",
        city: "City",
        region: "Region",
        address: "Address",
        addressPlaceholder: "Full address",
        creatingAccount: "Creating account...",
        signUp: "Sign Up",
        alreadyRegistered: "Already registered?",
        logIn: "Log In"
      };
    }
  };

  const t = getTranslation();

  return (
    <Layout>
      <div className="flex justify-center items-center py-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-health-blue">{t.register}</CardTitle>
            <CardDescription>
              {t.createAccount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="w-full" onValueChange={(val) => setRole(val as UserRole)}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="patient">{t.patient}</TabsTrigger>
                <TabsTrigger value="professional">{t.professional}</TabsTrigger>
              </TabsList>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.fullName}</Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordMatch(e.target.value === password);
                      }}
                      required
                      className={!passwordMatch ? "border-red-500" : ""}
                    />
                    {!passwordMatch && (
                      <p className="text-red-500 text-sm">
                        {t.passwordMismatch}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Location information section */}
                <div className="space-y-2">
                  <h3 className="text-md font-medium">{t.location}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t.city}</Label>
                      <Input
                        id="city"
                        placeholder="Abidjan"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">{t.region}</Label>
                      <Input
                        id="region"
                        placeholder="Cocody"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t.address}</Label>
                    <Textarea
                      id="address"
                      placeholder={t.addressPlaceholder}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <TabsContent value="professional">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">{t.specialty}</Label>
                      <Input
                        id="specialty"
                        placeholder={t.specialtyPlaceholder}
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required={role === "professional"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">{t.license}</Label>
                      <Input
                        id="license"
                        placeholder={t.licensePlaceholder}
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                        required={role === "professional"}
                      />
                    </div>
                  </div>
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
