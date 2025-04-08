
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info, Volume2 } from "lucide-react";
import { Product } from "@/types/user";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  enableVoiceHelp?: boolean;
}

const ProductCard = ({ product, onAddToCart, enableVoiceHelp = false }: ProductCardProps) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const requiresPrescription = product.requiresPrescription || false;

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      onAddToCart(product);
      setIsLoading(false);
    }, 500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const getStockLabel = () => {
    if (product.inStock === 0) {
      return "Rupture de stock";
    }
    if (product.inStock < 5) {
      return "Stock limité";
    }
    return "En stock";
  };

  const getStockColor = () => {
    if (product.inStock === 0) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    if (product.inStock < 5) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
    return "bg-green-100 text-green-800 border-green-200";
  };

  const speakProductInfo = () => {
    if ('speechSynthesis' in window) {
      const text = `${product.name}. ${product.description}. Prix: ${formatPrice(product.price)}. ${getStockLabel()}. ${requiresPrescription ? 'Ce produit nécessite une ordonnance.' : ''}`;
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="pt-6 px-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
          {enableVoiceHelp && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 -mr-2 -mt-2" 
              onClick={speakProductInfo}
              title="Écouter les informations du produit"
            >
              <Volume2 className="h-4 w-4 text-health-blue" />
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="outline" className={`text-xs ${getStockColor()}`}>
            {getStockLabel()}
          </Badge>
          
          {requiresPrescription && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
              Ordonnance
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-3 mb-4">{product.description}</p>
        
        <div className="font-semibold text-lg">{formatPrice(product.price)}</div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 px-4">
        {product.inStock > 0 ? (
          <Button 
            className="w-full" 
            onClick={handleAddToCart} 
            disabled={isLoading}
          >
            {isLoading ? "Ajout..." : "Ajouter au panier"}
            <ShoppingCart className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button className="w-full" disabled>
            Indisponible
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
