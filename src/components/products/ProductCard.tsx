
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, Prescription } from "@/types/user";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card key={product.id} className="overflow-hidden">
      <div className="aspect-square relative bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain w-full h-full p-6"
        />
        {product.requiresPrescription && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            Sur ordonnance
          </Badge>
        )}
        {!product.inStock && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            Rupture de stock
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
        <p className="font-bold text-health-dark">{product.price.toFixed(0)} F CFA</p>
        {product.insuranceCoverage?.eligible && (
          <div className="mt-1">
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {product.insuranceCoverage.coveragePercentage 
                ? `Remboursable ${product.insuranceCoverage.coveragePercentage}%` 
                : "Remboursable"}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.requiresPrescription
            ? "Ajouter avec ordonnance"
            : !product.inStock
            ? "Indisponible"
            : "Ajouter au panier"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
