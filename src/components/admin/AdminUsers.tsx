
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
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  UserCheck, 
  UserX 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Données fictives pour la démonstration
const mockUsers = [
  { id: 1, name: "Marie Dupont", email: "marie@example.com", role: "patient", status: "active" },
  { id: 2, name: "Jean Michel", email: "jeanm@example.com", role: "professional", status: "active" },
  { id: 3, name: "Sophie Martin", email: "sophie@example.com", role: "patient", status: "inactive" },
  { id: 4, name: "Paul Durand", email: "paul@example.com", role: "patient", status: "active" },
  { id: 5, name: "Anne Petit", email: "anne@example.com", role: "professional", status: "active" },
  { id: 6, name: "Luc Bernard", email: "luc@example.com", role: "patient", status: "inactive" },
  { id: 7, name: "Céline Leroy", email: "celine@example.com", role: "patient", status: "active" },
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const { toast } = useToast();

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      )
    );
    
    const targetUser = users.find(user => user.id === id);
    const newStatus = targetUser?.status === "active" ? "inactive" : "active";
    
    toast({
      title: `Statut mis à jour`,
      description: `L'utilisateur ${targetUser?.name} est maintenant ${newStatus === "active" ? "actif" : "inactif"}.`,
    });
  };

  const handleDelete = (id: number) => {
    const userToDelete = users.find(user => user.id === id);
    setUsers(users.filter((user) => user.id !== id));
    
    toast({
      title: "Utilisateur supprimé",
      description: `${userToDelete?.name} a été supprimé avec succès.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Gestion des Utilisateurs</h3>
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
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === "professional" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {user.role === "professional" ? "Professionnel" : "Patient"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {user.status === "active" ? "Actif" : "Inactif"}
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
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        {user.status === "active" ? (
                          <UserX className="h-4 w-4 text-red-500" />
                        ) : (
                          <UserCheck className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDelete(user.id)}
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

export default AdminUsers;
