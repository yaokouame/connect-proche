
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import { User, UserPlus, Clock, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser, updateUserProfile } = useUser();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!currentUser) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Connectez-vous pour accéder à votre profil</h1>
          <p className="mb-8 text-gray-600">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button>Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">S'inscrire</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Timeout to simulate saving
    setTimeout(() => {
      updateUserProfile({
        ...currentUser,
        name,
        email
      });
      setIsSaving(false);
    }, 1000);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-health-dark">Mon profil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div>
            <div className="flex flex-col items-center mb-6 py-8 bg-white rounded-lg border">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={currentUser?.profileImageUrl} alt={currentUser?.name} />
                <AvatarFallback className="text-xl bg-health-blue text-white">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{currentUser.name}</h2>
              <p className="text-gray-500 mb-2">{currentUser.email}</p>
              <p className="text-sm px-3 py-1 bg-health-teal/10 text-health-teal rounded-full">
                {currentUser.role === "patient" ? "Patient" : "Professionnel de santé"}
              </p>
            </div>
            
            <nav className="space-y-1">
              <Link to="/profile" className="flex items-center px-4 py-2 bg-health-blue/10 text-health-blue rounded-md">
                <User className="mr-2 h-5 w-5" />
                <span>Informations personnelles</span>
              </Link>
              <Link to="/appointments" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Clock className="mr-2 h-5 w-5" />
                <span>Mes rendez-vous</span>
              </Link>
              {currentUser.role === "patient" && (
                <Link to="/medical-records" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Dossier médical</span>
                </Link>
              )}
              <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                <Settings className="mr-2 h-5 w-5" />
                <span>Paramètres</span>
              </Link>
            </nav>
          </div>

          {/* Main content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="preferences">Préférences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                      
                      {currentUser.role === "professional" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="specialty">Spécialité</Label>
                            <Input 
                              id="specialty" 
                              value={(currentUser as any).specialty || ""}
                              disabled
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="license">Numéro de licence</Label>
                            <Input 
                              id="license" 
                              value={(currentUser as any).license || ""}
                              disabled
                            />
                          </div>
                        </>
                      )}
                      
                      {currentUser.role === "patient" && (
                        <div className="space-y-2">
                          <Label htmlFor="medicalInfo">Informations médicales</Label>
                          <Textarea 
                            id="medicalInfo" 
                            placeholder="Allergies, maladies chroniques, traitements en cours..."
                            rows={4}
                          />
                        </div>
                      )}
                      
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Notification preferences */}
                    <div>
                      <h3 className="font-medium mb-2">Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notif-email" className="flex-1">
                            Recevoir des emails pour les rappels de rendez-vous
                          </Label>
                          <input type="checkbox" id="notif-email" defaultChecked className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notif-sms" className="flex-1">
                            Recevoir des SMS pour les rappels de rendez-vous
                          </Label>
                          <input type="checkbox" id="notif-sms" defaultChecked className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Privacy preferences */}
                    <div>
                      <h3 className="font-medium mb-2">Confidentialité</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="privacy-profile" className="flex-1">
                            Autoriser l'accès à mon profil pour mes professionnels de santé
                          </Label>
                          <input type="checkbox" id="privacy-profile" defaultChecked className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="privacy-data" className="flex-1">
                            Partager mes données anonymisées pour améliorer la plateforme
                          </Label>
                          <input type="checkbox" id="privacy-data" className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    
                    <Button>Enregistrer les préférences</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
