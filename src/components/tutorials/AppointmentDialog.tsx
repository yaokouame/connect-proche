
import React from "react";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const AppointmentDialog: React.FC = () => {
  const { currentUser } = useUser();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Prendre rendez-vous
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prendre rendez-vous</DialogTitle>
          <DialogDescription>
            {currentUser ? 
              "Vous allez être redirigé vers la page de prise de rendez-vous." : 
              "Veuillez vous connecter pour prendre rendez-vous."
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {currentUser ? (
            <Link to="/appointments" className="w-full">
              <Button className="w-full">Continuer vers les rendez-vous</Button>
            </Link>
          ) : (
            <Link to="/login" className="w-full">
              <Button className="w-full">Se connecter</Button>
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
