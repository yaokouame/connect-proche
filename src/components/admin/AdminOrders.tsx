
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
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Données fictives pour la démonstration
const mockOrders = [
  { id: "ORD-1234", customer: "Marie Dupont", date: "2025-04-05", total: 6700, status: "pending", items: 3 },
  { id: "ORD-1235", customer: "Paul Durand", date: "2025-04-04", total: 12500, status: "completed", items: 5 },
  { id: "ORD-1236", customer: "Sophie Martin", date: "2025-04-03", total: 4300, status: "cancelled", items: 2 },
  { id: "ORD-1237", customer: "Luc Bernard", date: "2025-04-02", total: 8900, status: "completed", items: 4 },
  { id: "ORD-1238", customer: "Anne Petit", date: "2025-04-01", total: 3200, status: "pending", items: 1 },
  { id: "ORD-1239", customer: "Jean Michel", date: "2025-03-31", total: 15600, status: "completed", items: 7 },
  { id: "ORD-1240", customer: "Céline Leroy", date: "2025-03-30", total: 9400, status: "pending", items: 3 },
];

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(mockOrders);
  const { toast } = useToast();

  // Filtrer les commandes en fonction du terme de recherche
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    
    const targetOrder = orders.find(order => order.id === id);
    
    toast({
      title: `Commande mise à jour`,
      description: `La commande ${id} est maintenant ${
        newStatus === "completed" ? "terminée" : 
        newStatus === "cancelled" ? "annulée" : "en attente"
      }.`,
    });
  };

  // Transformer le statut en français
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "En attente";
      case "completed": return "Terminée";
      case "cancelled": return "Annulée";
      default: return status;
    }
  };

  // Obtenir la classe de couleur en fonction du statut
  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Gestion des Commandes</h3>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Aucune commande trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total} F CFA</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {order.status === "pending" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleUpdateStatus(order.id, "completed")}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleUpdateStatus(order.id, "cancelled")}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </>
                      )}
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

export default AdminOrders;
