
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { CalendarPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewAppointmentDialogProps {
  onCreateAppointment: (appointmentData: {
    date: string;
    time: string;
    notes?: string;
  }) => void;
}

const NewAppointmentDialog: React.FC<NewAppointmentDialogProps> = ({ 
  onCreateAppointment 
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      toast({
        variant: "destructive",
        title: "Champs requis",
        description: "Veuillez sélectionner une date et une heure",
      });
      return;
    }
    
    const formattedDate = format(date, "yyyy-MM-dd");
    
    onCreateAppointment({
      date: formattedDate,
      time,
      notes,
    });
    
    // Reset form
    setDate(undefined);
    setTime("");
    setNotes("");
    setOpen(false);
    
    toast({
      title: "Rendez-vous créé",
      description: "Votre rendez-vous a été programmé avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <CalendarPlus className="h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prendre un rendez-vous</DialogTitle>
          <DialogDescription>
            Sélectionnez une date et une heure pour votre rendez-vous
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              locale={fr}
              className="rounded-md border mx-auto"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="time">Heure</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Informations supplémentaires pour le rendez-vous"
              rows={3}
            />
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit">Confirmer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentDialog;
