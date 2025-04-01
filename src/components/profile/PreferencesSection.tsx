
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PreferencesSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
  );
};

export default PreferencesSection;
