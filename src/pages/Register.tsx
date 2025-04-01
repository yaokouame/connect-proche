
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState<UserRole>("patient");
  const [loading, setLoading] = useState(false);
  const [specialty, setSpecialty] = useState("");
  const [license, setLicense] = useState("");
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

  return (
    <Layout>
      <div className="flex justify-center items-center py-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-health-blue">Inscription</CardTitle>
            <CardDescription>
              Créez votre compte pour accéder à tous nos services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="w-full" onValueChange={(val) => setRole(val as UserRole)}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="patient">Patient</TabsTrigger>
                <TabsTrigger value="professional">Professionnel de santé</TabsTrigger>
              </TabsList>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
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
                        Les mots de passe ne correspondent pas
                      </p>
                    )}
                  </div>
                </div>
                
                <TabsContent value="professional">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Spécialité</Label>
                      <Input
                        id="specialty"
                        placeholder="ex: Cardiologue, Infirmier, Dentiste..."
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required={role === "professional"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">Numéro de licence professionnelle</Label>
                      <Input
                        id="license"
                        placeholder="ex: 12345678"
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
                  {loading ? "Création du compte..." : "S'inscrire"}
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Déjà inscrit?{" "}
              <Link to="/login" className="text-health-blue hover:underline">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
