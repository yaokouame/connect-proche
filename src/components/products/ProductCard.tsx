
import React, { useCallback, useMemo } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Volume2 } from "lucide-react";
import { Product } from "@/types/user";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  enableVoiceHelp?: boolean;
}

// Optimized with React.memo to prevent unnecessary re-renders
const ProductCard = React.memo(({ product, onAddToCart, enableVoiceHelp = false }: ProductCardProps) => {
  
  // Optimize the add to cart handler
  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
  }, [product, onAddToCart]);
  
  // Optimize the speech function 
  const speakProductInfo = useCallback(() => {
    if ('speechSynthesis' in window) {
      const text = `${product.name}. ${product.description}. Prix: ${product.price} francs CFA.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  }, [product]);

  // Memoize the price display
  const formattedPrice = useMemo(() => {
    return `${product.price.toFixed(0)} F CFA`;
  }, [product.price]);

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-health-dark">{product.name}</CardTitle>
          {enableVoiceHelp && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={speakProductInfo} 
              className="h-8 w-8 p-0 hover:bg-blue-50"
              aria-label="Écouter la description du produit"
            >
              <Volume2 className="h-4 w-4 text-health-blue" />
            </Button>
          )}
        </div>
        <CardDescription className="text-gray-600">{product.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow pt-2">
        <div className="space-y-2 text-sm">
          <p className="bg-gray-50 p-2 rounded-md"><span className="font-medium text-gray-700">Catégorie:</span> {product.category}</p>
          <p className={`p-2 rounded-md ${product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <span className="font-medium">Disponibilité:</span> {product.inStock ? 'En stock' : 'Épuisé'}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <div className="text-lg font-bold text-health-blue">{formattedPrice}</div>
        <Button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          size="sm"
          className="bg-health-blue hover:bg-health-teal"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </CardFooter>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
