
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Settings, Bell, Globe, Shield, Save } from "lucide-react";
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
    toast({
      title: t("preferences.updatedSuccess"),
      description: t("preferences.updatedDescription"),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <Settings className="h-6 w-6 text-health-blue" />
        <CardTitle>{t("preferences.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-health-blue" />
            <h3 className="text-lg font-medium">{t("preferences.language")}</h3>
          </div>
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger>
              <SelectValue placeholder={t("common.select")} />
            </SelectTrigger>
            <SelectContent>
              {["fr", "en", "es"].map((lang) => (
                <SelectItem key={lang} value={lang} className="flex items-center">
                  <span className="mr-2">{lang === "fr" ? "🇫🇷" : lang === "en" ? "🇬🇧" : "🇪🇸"}</span>
                  {{"fr": "Français", "en": "English", "es": "Español"}[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-health-blue" />
            <h3 className="text-lg font-medium">{t("preferences.notifications")}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t("preferences.notifEmail")}</Label>
              <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
            </div>
            <div className="flex items-center justify-between">
              <Label>{t("preferences.notifSms")}</Label>
              <Switch checked={notifSms} onCheckedChange={setNotifSms} />
            </div>
            
            <div className="space-y-2">
              <Label>{t("preferences.reminderFreq")}</Label>
              <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder={t("common.select")} />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: "daily", label: t("preferences.reminderDaily") },
                    { value: "3-days", label: t("preferences.reminder3Days") },
                    { value: "weekly", label: t("preferences.reminderWeekly") }
                  ].map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-health-blue" />
            <h3 className="text-lg font-medium">{t("preferences.privacyTitle")}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t("preferences.shareProfile")}</Label>
              <Switch checked={shareProfile} onCheckedChange={setShareProfile} />
            </div>
            <div className="flex items-center justify-between">
              <Label>{t("preferences.shareData")}</Label>
              <Switch checked={shareData} onCheckedChange={setShareData} />
            </div>
          </div>
        </div>
        
        <Button onClick={handleSavePreferences} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {t("preferences.saveButton")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;
