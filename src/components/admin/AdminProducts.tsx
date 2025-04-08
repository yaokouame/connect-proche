
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  ShoppingBag 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Données fictives pour la démonstration
const mockProducts = [
  { id: 1, name: "Amoxicilline", category: "Antibiotique", price: 4500, inStock: true, requiresPrescription: true },
  { id: 2, name: "Doliprane", category: "Analgésique", price: 1200, inStock: true, requiresPrescription: false },
  { id: 3, name: "Ventoline", category: "Respiratoire", price: 3800, inStock: true, requiresPrescription: true },
  { id: 4, name: "Advil", category: "Anti-inflammatoire", price: 1500, inStock: false, requiresPrescription: false },
  { id: 5, name: "Augmentin", category: "Antibiotique", price: 5200, inStock: true, requiresPrescription: true },
  { id: 6, name: "Smecta", category: "Digestif", price: 2300, inStock: true, requiresPrescription: false },
  { id: 7, name: "Imodium", category: "Digestif", price: 1800, inStock: false, requiresPrescription: false },
  { id: 8, name: "Aspirine", category: "Analgésique", price: 900, inStock: true, requiresPrescription: false },
];

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(mockProducts);
  const { toast } = useToast();

  // Filtrer les produits en fonction du terme de recherche
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStock = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
    
    const targetProduct = products.find(product => product.id === id);
    const newStatus = !targetProduct?.inStock;
    
    toast({
      title: `Stock mis à jour`,
      description: `${targetProduct?.name} est maintenant ${newStatus ? "en stock" : "en rupture de stock"}.`,
    });
  };

  const handleDelete = (id: number) => {
    const productToDelete = products.find(product => product.id === id);
    setProducts(products.filter((product) => product.id !== id));
    
    toast({
      title: "Produit supprimé",
      description: `${productToDelete?.name} a été supprimé avec succès.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Gestion des Produits</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Ordonnance</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Aucun produit trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price} F CFA</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.requiresPrescription
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {product.requiresPrescription ? "Requise" : "Non requise"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {product.inStock ? "En stock" : "Rupture"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleToggleStock(product.id)}
                      >
                        <ShoppingBag className={`h-4 w-4 ${product.inStock ? "text-green-500" : "text-red-500"}`} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;
