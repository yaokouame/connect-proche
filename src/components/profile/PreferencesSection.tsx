
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";

const PreferencesSection = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState("fr");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(true);
  const [shareProfile, setShareProfile] = useState(true);
  const [shareData, setShareData] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState("daily");

  const handleSavePreferences = () => {
    // In a real app, this would save to an API
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Langue et région</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-medium">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-email" className="flex-1">
                Recevoir des emails pour les rappels de rendez-vous
              </Label>
              <Switch 
                id="notif-email" 
                checked={notifEmail} 
                onCheckedChange={setNotifEmail} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-sms" className="flex-1">
                Recevoir des SMS pour les rappels de rendez-vous
              </Label>
              <Switch 
                id="notif-sms" 
                checked={notifSms} 
                onCheckedChange={setNotifSms} 
              />
            </div>
            
            <div className="space-y-2 pl-6">
              <Label htmlFor="reminder-frequency">Fréquence des rappels</Label>
              <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une fréquence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Quotidien</SelectItem>
                  <SelectItem value="3-days">3 jours avant</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-medium">Confidentialité</h3>
          <div className="bg-blue-50 p-4 rounded-md mb-4 flex items-start">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Ces paramètres déterminent comment vos informations médicales sont partagées avec les professionnels de santé.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="privacy-profile" className="flex-1">
                Autoriser l'accès à mon profil pour mes professionnels de santé
              </Label>
              <Switch 
                id="privacy-profile" 
                checked={shareProfile} 
                onCheckedChange={setShareProfile} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="privacy-data" className="flex-1">
                Partager mes données anonymisées pour améliorer la plateforme
              </Label>
              <Switch 
                id="privacy-data" 
                checked={shareData} 
                onCheckedChange={setShareData} 
              />
            </div>
          </div>
        </div>
        
        <Button onClick={handleSavePreferences} className="w-full">Enregistrer les préférences</Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;
