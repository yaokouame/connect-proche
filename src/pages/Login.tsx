
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/Layout";
import { UserCog, ShoppingCart } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Determine if the user is coming from cart to offer guest checkout
  const isFromCart = window.location.search.includes('fromCart=true');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      
      // Redirect to cart if user came from there
      if (isFromCart) {
        navigate("/cart");
      } else {
        navigate("/");
      }
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à votre compte.",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: "Email ou mot de passe incorrect. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestCheckout = () => {
    // Store guest mode in localStorage
    localStorage.setItem("guestMode", "true");
    navigate("/cart");
    
    toast({
      title: "Mode invité activé",
      description: "Vous pouvez continuer votre achat sans créer de compte.",
    });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-health-blue">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder à votre compte ConnectProche
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="login" className="flex items-center justify-center">
                <UserCog className="w-4 h-4 mr-2" />
                Connexion
              </TabsTrigger>
              {isFromCart && (
                <TabsTrigger value="guest" className="flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Mode invité
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="login">
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link to="/forgot-password" className="text-sm text-health-teal hover:underline">
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
                    />
                    <Label htmlFor="remember" className="text-sm">Se souvenir de moi</Label>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-health-blue hover:bg-health-teal"
                    disabled={loading}
                  >
                    {loading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            
            {isFromCart && (
              <TabsContent value="guest">
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Acheter sans créer de compte</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Vous pouvez continuer votre achat en tant qu'invité sans avoir à créer un compte.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Commander rapidement sans inscription</li>
                      <li>• Vos informations ne seront utilisées que pour cette commande</li>
                      <li>• Possibilité de créer un compte plus tard</li>
                    </ul>
                    <Button 
                      onClick={handleGuestCheckout}
                      className="w-full"
                      variant="outline"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Continuer en tant qu'invité
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            )}
          </Tabs>
          
          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-gray-500">
              Pas encore de compte?{" "}
              <Link to="/register" className="text-health-blue hover:underline">
                S'inscrire
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
