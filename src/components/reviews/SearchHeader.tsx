
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showProductReviews: boolean;
  toggleReviewMode: () => void;
}

const SearchHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  showProductReviews, 
  toggleReviewMode 
}: SearchHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {showProductReviews ? "Rechercher un produit" : "Rechercher un médecin ou un établissement"}
        </CardTitle>
        <CardDescription>
          {showProductReviews 
            ? "Trouvez et partagez des avis sur les produits de santé" 
            : "Trouvez et partagez des avis sur les professionnels de santé"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={showProductReviews ? "Nom du produit, catégorie..." : "Nom, spécialité ou ville..."}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={toggleReviewMode} variant="outline" className="whitespace-nowrap">
            {showProductReviews ? "Voir avis médecins" : "Voir avis produits"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchHeader;
