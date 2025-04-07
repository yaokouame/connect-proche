
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Search, X } from "lucide-react";
import VoiceRecognition from "@/components/voice/VoiceRecognition";
import { useNavigate } from "react-router-dom";

interface GlobalVoiceSearchProps {
  className?: string;
  placeholder?: string;
}

const GlobalVoiceSearch: React.FC<GlobalVoiceSearchProps> = ({ 
  className = "", 
  placeholder = "Rechercher..." 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would trigger a search or navigation
      console.log("Searching for:", searchQuery);
      
      // Example voice commands
      const query = searchQuery.toLowerCase().trim();
      
      if (query.includes("profil") || query.includes("mon profil")) {
        navigate("/profile");
      } else if (query.includes("rendez-vous") || query.includes("mes rendez-vous")) {
        navigate("/appointments");
      } else if (query.includes("carte") || query.includes("map")) {
        navigate("/map");
      } else if (query.includes("messagerie") || query.includes("chat")) {
        navigate("/chat");
      } else if (query.includes("produits") || query.includes("pharmacie")) {
        navigate("/products");
      } else if (query.includes("tutoriels")) {
        navigate("/tutorials");
      } else if (query.includes("urgence") || query.includes("sos")) {
        // Trigger emergency action
        document.getElementById("emergency-button")?.click();
      } else {
        // Regular search - in a real app, this would navigate to search results
        console.log("Performing search for:", query);
      }
      
      // Clear input after processing
      setSearchQuery("");
    }
  };

  const handleVoiceResult = (text: string) => {
    setSearchQuery(text);
    // Auto-submit after voice input
    setTimeout(() => {
      document.getElementById("global-voice-search-form")?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <form 
      id="global-voice-search-form"
      onSubmit={handleSearch} 
      className={`relative flex w-full max-w-sm items-center space-x-2 ${className}`}
    >
      <div className="relative w-full">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isListening ? "Dites votre recherche..." : placeholder}
          className={`pr-16 ${isListening ? 'border-red-300 bg-red-50' : ''}`}
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-9 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <VoiceRecognition
          onResult={handleVoiceResult}
          onListening={setIsListening}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
        />
      </div>
      <Button type="submit" size="icon" className="h-10 w-10">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default GlobalVoiceSearch;
