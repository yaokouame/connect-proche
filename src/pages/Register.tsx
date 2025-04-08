
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
                />
                
                <LocationSelect
                  region={region}
                  setRegion={setRegion}
                  city={city}
                  setCity={setCity}
                  address={address}
                  setAddress={setAddress}
                  translations={t}
                />
                
                <TabsContent value="professional">
                  <ProfessionalFields
                    specialty={specialty}
                    setSpecialty={setSpecialty}
                    license={license}
                    setLicense={setLicense}
                    translations={t}
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
