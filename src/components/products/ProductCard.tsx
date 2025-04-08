
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
      const text = `${product.name}. ${product.description}. Prix: ${product.price} euros.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  }, [product]);

  // Memoize the price display
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price);
  }, [product.price]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          {enableVoiceHelp && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={speakProductInfo} 
              className="h-8 w-8 p-0"
              aria-label="Écouter la description du produit"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p><span className="font-medium">Catégorie:</span> {product.category}</p>
          <p><span className="font-medium">Disponibilité:</span> {product.stock > 0 ? 'En stock' : 'Épuisé'}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-bold">{formattedPrice}</div>
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
