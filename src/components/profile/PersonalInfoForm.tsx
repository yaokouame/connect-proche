
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

interface PersonalInfoFormProps {
  currentUser: User;
  updateUserProfile: (user: User) => void;
}

const PersonalInfoForm = ({ currentUser, updateUserProfile }: PersonalInfoFormProps) => {
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        name,
        email,
      };
      
      updateUserProfile(updatedUser);
      setIsSaving(false);
    }, 1000);
  };

  return (
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
          
          {currentUser?.role === "professional" && (
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
          
          <Button type="submit" className="mt-6" disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
