
import en from './en';
import fr from './fr';
import es from './es';
import { Language } from '@/contexts/LanguageContext';

// Translations for each language
const translations: Record<Language, Record<string, string>> = {
  en,
  fr,
  es
};

export default translations;
