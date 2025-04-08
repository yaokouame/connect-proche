
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfessionalsSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const ProfessionalsSearch: React.FC<ProfessionalsSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder={t('professionals.search.placeholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default ProfessionalsSearch;
