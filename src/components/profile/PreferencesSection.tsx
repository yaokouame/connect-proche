
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const PreferencesSection = () => {
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(true);
  const [shareProfile, setShareProfile] = useState(true);
  const [shareData, setShareData] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState("daily");

  const handleSavePreferences = () => {
    // In a real app, this would save to an API
    toast({
      title: t("preferences.updatedSuccess"),
      description: t("preferences.updatedDescription"),
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  const languageNames: Record<Language, string> = {
    fr: "Français",
    en: "English",
    es: "Español"
  };

  const reminderOptions = [
    { value: "daily", label: t("preferences.reminderDaily") },
    { value: "3-days", label: t("preferences.reminder3Days") },
    { value: "weekly", label: t("preferences.reminderWeekly") }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("preferences.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">{t("preferences.language")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t("preferences.language")}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t("common.search")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr" className="flex items-center">
                    <span className="mr-2">🇫🇷</span> Français
                  </SelectItem>
                  <SelectItem value="en" className="flex items-center">
                    <span className="mr-2">🇬🇧</span> English
                  </SelectItem>
                  <SelectItem value="es" className="flex items-center">
                    <span className="mr-2">🇪🇸</span> Español
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-medium">{t("preferences.notifications")}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-email" className="flex-1">
                {t("preferences.notifEmail")}
              </Label>
              <Switch 
                id="notif-email" 
                checked={notifEmail} 
                onCheckedChange={setNotifEmail} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-sms" className="flex-1">
                {t("preferences.notifSms")}
              </Label>
              <Switch 
                id="notif-sms" 
                checked={notifSms} 
                onCheckedChange={setNotifSms} 
              />
            </div>
            
            <div className="space-y-2 pl-6">
              <Label htmlFor="reminder-frequency">{t("preferences.reminderFreq")}</Label>
              <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("common.search")} />
                </SelectTrigger>
                <SelectContent>
                  {reminderOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-medium">{t("preferences.privacyTitle")}</h3>
          <div className="bg-blue-50 p-4 rounded-md mb-4 flex items-start">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              {t("preferences.privacyInfo")}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="privacy-profile" className="flex-1">
                {t("preferences.shareProfile")}
              </Label>
              <Switch 
                id="privacy-profile" 
                checked={shareProfile} 
                onCheckedChange={setShareProfile} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="privacy-data" className="flex-1">
                {t("preferences.shareData")}
              </Label>
              <Switch 
                id="privacy-data" 
                checked={shareData} 
                onCheckedChange={setShareData} 
              />
            </div>
          </div>
        </div>
        
        <Button onClick={handleSavePreferences} className="w-full">
          {t("preferences.saveButton")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;
