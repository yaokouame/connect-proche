
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUser, ShoppingBag, CreditCard, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminStats = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Simuler un chargement des données
    const timer = setTimeout(() => {
      toast({
        title: "Données mises à jour",
        description: "Les statistiques ont été rafraîchies avec succès.",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilisateurs Totaux</CardTitle>
          <CircleUser className="h-4 w-4 text-health-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,249</div>
          <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Produits Vendus</CardTitle>
          <ShoppingBag className="h-4 w-4 text-health-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8,734</div>
          <p className="text-xs text-muted-foreground">+23% par rapport au mois dernier</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
          <CreditCard className="h-4 w-4 text-health-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">16.4M F CFA</div>
          <p className="text-xs text-muted-foreground">+7% par rapport au mois dernier</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
          <TrendingUp className="h-4 w-4 text-health-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24%</div>
          <p className="text-xs text-muted-foreground">+5% par rapport au mois dernier</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
