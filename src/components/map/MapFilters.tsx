
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, SortAsc, Filter, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export interface MapFiltersProps {
  filterByInsurance: string | null;
  setFilterByInsurance: (value: string | null) => void;
  userInsuranceProvider: string | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: "distance" | "rating" | "alphabetical";
  setSortBy: (value: "distance" | "rating" | "alphabetical") => void;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  filterByInsurance,
  setFilterByInsurance,
  userInsuranceProvider,
  sortBy,
  setSortBy,
}) => {
  const { t } = useLanguage();
  
  const insuranceOptions = [
    { label: t("map.all"), value: null },
    { label: "CNAM", value: "CNAM" },
    { label: "MUGEFCI", value: "MUGEFCI" },
    { label: "CNPS", value: "CNPS" },
    { label: "CMU", value: "CMU" },
  ];

  const sortOptions = [
    { label: t("map.sortDistance"), value: "distance", icon: <MapPin className="h-4 w-4" /> },
    { label: t("map.sortRating"), value: "rating", icon: <Check className="h-4 w-4" /> },
    { label: t("map.sortAlphabetical"), value: "alphabetical", icon: <SortAsc className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      {/* Insurance Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex-1 flex items-center justify-between">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4 text-health-blue" />
              <span className="whitespace-nowrap">{t("map.insurance")}:</span> 
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-1 truncate max-w-[100px]">{filterByInsurance || t("map.all")}</span>
              <ChevronsUpDown className="h-4 w-4 flex-shrink-0" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{t("map.filterByInsurance")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {insuranceOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(
                  "flex items-center justify-between",
                  (option.value === userInsuranceProvider) && "font-medium"
                )}
                onClick={() => setFilterByInsurance(option.value)}
              >
                {option.label}
                <div className="flex items-center">
                  {option.value === filterByInsurance && <Check className="h-4 w-4 mr-1 text-health-blue" />}
                  {option.value === userInsuranceProvider && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {t("map.yourPlan")}
                    </span>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort By Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex-1 flex items-center justify-between">
            <div className="flex items-center">
              <SortAsc className="mr-2 h-4 w-4 text-health-blue" />
              <span className="whitespace-nowrap">{t("map.sortBy")}:</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-1 truncate max-w-[100px]">
                {sortOptions.find(o => o.value === sortBy)?.label || t("map.sortDistance")}
              </span>
              <ChevronsUpDown className="h-4 w-4 flex-shrink-0" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{t("map.sortBy")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className="flex items-center justify-between"
                onClick={() => setSortBy(option.value as "distance" | "rating" | "alphabetical")}
              >
                <div className="flex items-center">
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </div>
                {option.value === sortBy && <Check className="h-4 w-4 text-health-blue" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MapFilters;
