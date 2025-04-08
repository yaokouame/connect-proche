
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-6 mb-8">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher un produit..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
