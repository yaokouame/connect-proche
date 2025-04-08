
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Volume2 } from "lucide-react";
import { Product } from "@/types/user";
import { VoiceHelp } from "@/components/voice/VoiceAssistant";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  enableVoiceHelp?: boolean;
}

const ProductCard = ({ product, onAddToCart, enableVoiceHelp = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const speakProductInfo = () => {
    if ('speechSynthesis' in window) {
      const description = `${product.name}. ${product.description}. Prix: ${product.price} euros. ${product.requiresPrescription ? 'Ce produit nécessite une ordonnance.' : ''}`;
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.lang = 'fr-FR';
      
      // Essaie de trouver une voix française
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:shadow-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-40 overflow-hidden bg-gray-100 relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Image non disponible
          </div>
        )}
        {enableVoiceHelp && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 bg-white/80 hover:bg-white"
            onClick={speakProductInfo}
            title="Écouter la description du produit"
          >
            <Volume2 className="h-4 w-4 text-health-blue" />
          </Button>
        )}
        {product.requiresPrescription && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Ordonnance requise
          </Badge>
        )}
        {product.stock < 5 && product.stock > 0 && (
          <Badge variant="secondary" className="absolute bottom-2 left-2">
            Stock limité: {product.stock}
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="outline" className="absolute bottom-2 left-2 bg-gray-100">
            Rupture de stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-md mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 h-10">
          {product.description}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <p className="font-semibold text-health-blue">{product.price} €</p>
          {product.category && (
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="w-full"
          variant={product.requiresPrescription ? "outline" : "default"}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.requiresPrescription
            ? "Ajouter avec ordonnance"
            : "Ajouter au panier"}
        </Button>
      </CardFooter>

      {enableVoiceHelp && (
        <div className="p-2 text-center">
          <VoiceHelp text={`${product.name}. ${product.description}. Prix: ${product.price} euros.`} />
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
