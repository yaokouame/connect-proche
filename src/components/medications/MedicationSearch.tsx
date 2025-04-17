
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MedicationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MedicationSearch = ({ searchQuery, setSearchQuery }: MedicationSearchProps) => {
  return (
    <div className="mb-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Rechercher un médicament..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MedicationSearch;
