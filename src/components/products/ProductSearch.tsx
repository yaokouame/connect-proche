
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, Volume2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import VoiceRecognition from "@/components/voice/VoiceRecognition";

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  categories: string[];
}

const ProductSearch = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
}: ProductSearchProps) => {
  const isMobile = useIsMobile();
  const [isListening, setIsListening] = useState(false);

  const speakSearchHelp = () => {
    if ('speechSynthesis' in window) {
      const text = "Vous pouvez rechercher un produit en tapant son nom ou utiliser la dictée vocale en cliquant sur l'icône de microphone. Pour filtrer par catégorie, utilisez le menu déroulant à côté.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceResult = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-6 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          className={`pl-10 ${isListening ? 'border-red-300 bg-red-50 pr-20' : 'pr-16'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={speakSearchHelp}
            title="Aide vocale pour la recherche"
          >
            <Volume2 className="h-4 w-4 text-health-blue" />
          </Button>
          <VoiceRecognition 
            onResult={handleVoiceResult} 
            onListening={setIsListening}
            className="h-8 w-8"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className={`${isMobile ? 'flex-1' : 'w-[180px]'}`}>
            <SelectValue placeholder="Toutes catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductSearch;
