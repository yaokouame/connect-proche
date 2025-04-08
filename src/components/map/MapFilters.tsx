
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ShieldCheck } from "lucide-react";

interface MapFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: "distance" | "rating" | "alphabetical";
  setSortBy: (sortBy: "distance" | "rating" | "alphabetical") => void;
  filterByInsurance: string | null;
  setFilterByInsurance: (insurance: string | null) => void;
  userInsuranceProvider: string | null;
}

const MapFilters = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filterByInsurance,
  setFilterByInsurance,
  userInsuranceProvider
}: MapFiltersProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par nom, adresse ou service..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Trier par..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="rating">Évaluation</SelectItem>
              <SelectItem value="alphabetical">Alphabétique</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filterByInsurance || "all"} 
            onValueChange={(value) => setFilterByInsurance(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtrer par assurance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les assurances</SelectItem>
              <SelectItem value="MUGEFCI">MUGEFCI</SelectItem>
              <SelectItem value="CNPS">CNPS</SelectItem>
              <SelectItem value="CMU">CMU</SelectItem>
              <SelectItem value="IPS-CGRAE">IPS-CGRAE</SelectItem>
              <SelectItem value="SUNU">SUNU Assurances</SelectItem>
              {userInsuranceProvider && (
                <SelectItem value={userInsuranceProvider}>
                  {userInsuranceProvider} (Votre assurance)
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {userInsuranceProvider && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-blue-600" />
          <div className="text-sm">
            <span className="font-medium">Votre assurance: </span>
            <span>{userInsuranceProvider}</span>
            {filterByInsurance !== userInsuranceProvider && (
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm ml-2"
                onClick={() => setFilterByInsurance(userInsuranceProvider)}
              >
                Voir les établissements compatibles
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MapFilters;
