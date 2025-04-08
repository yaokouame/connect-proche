
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, SortAsc } from "lucide-react";
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
  const insuranceOptions = [
    { label: "Show All", value: null },
    { label: "CNAM", value: "CNAM" },
    { label: "MUGEFCI", value: "MUGEFCI" },
    { label: "CNPS", value: "CNPS" },
    { label: "CMU", value: "CMU" },
  ];

  const sortOptions = [
    { label: "Distance", value: "distance" },
    { label: "Rating", value: "rating" },
    { label: "Alphabetical", value: "alphabetical" },
  ];

  return (
    <div className="flex space-x-2">
      {/* Insurance Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <span className="mr-1">Insurance:</span> 
            <span className="font-medium">{filterByInsurance || "All"}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Insurance</DropdownMenuLabel>
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
                {option.value === filterByInsurance && <Check className="h-4 w-4" />}
                {option.value === userInsuranceProvider && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Your Plan
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort By Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <SortAsc className="mr-2 h-4 w-4" />
            <span>Sort: {sortOptions.find(o => o.value === sortBy)?.label}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className="flex items-center justify-between"
                onClick={() => setSortBy(option.value as "distance" | "rating" | "alphabetical")}
              >
                {option.label}
                {option.value === sortBy && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MapFilters;
