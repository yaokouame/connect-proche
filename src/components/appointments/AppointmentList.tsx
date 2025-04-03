
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, MoreHorizontal } from "lucide-react";
import { Appointment } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentListProps {
  appointments: Appointment[];
  onCancelAppointment: (appointmentId: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments,
  onCancelAppointment
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };

  const handleCancel = () => {
    if (selectedAppointment) {
      onCancelAppointment(selectedAppointment.id);
      setShowDetails(false);
      toast({
        title: "Rendez-vous annulé",
        description: `Votre rendez-vous du ${formatDate(selectedAppointment.date)} a été annulé.`,
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const getStatusBadge = (status: "scheduled" | "completed" | "cancelled") => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-green-500">Programmé</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Terminé</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Annulé</Badge>;
      default:
        return null;
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Vous n'avez pas de rendez-vous pour le moment.</p>
        <Button className="mt-4">Prendre un rendez-vous</Button>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Heure</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">{formatDate(appointment.date)}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{getStatusBadge(appointment.status)}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(appointment)}
                >
                  Détails
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails du rendez-vous</DialogTitle>
            <DialogDescription>
              Informations sur votre rendez-vous médical
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-health-blue" />
                <span className="font-medium">Date:</span>
                <span>{formatDate(selectedAppointment.date)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-health-blue" />
                <span className="font-medium">Heure:</span>
                <span>{selectedAppointment.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge>{selectedAppointment.status}</Badge>
              </div>

              {selectedAppointment.notes && (
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-health-blue mt-1" />
                  <div>
                    <span className="font-medium block">Notes:</span>
                    <p className="text-gray-600">{selectedAppointment.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
            {selectedAppointment && selectedAppointment.status === "scheduled" && (
              <Button variant="destructive" onClick={handleCancel}>
                Annuler le rendez-vous
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentList;
