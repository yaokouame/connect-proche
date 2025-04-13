
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { language, setLanguage, t } = useLanguage();

  const languageNames: Record<Language, string> = {
    fr: "Français",
    en: "English",
    es: "Español"
  };

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger className={`flex items-center ${className || ''}`}>
        <Languages className="h-4 w-4 mr-2" />
        <SelectValue placeholder={t('common.language')}>
          {languageNames[language]}
        </SelectValue>
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
  );
};

export default LanguageSelector;
