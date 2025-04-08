
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import ContactSpecialistForm from "./ContactSpecialistForm";

const CallToAction: React.FC = () => {
  const { currentUser } = useUser();
  const [contactDialogOpen, setContactDialogOpen] = React.useState(false);

  return (
    <div className="mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Besoin de plus d'informations?</h2>
      <p className="text-gray-600 mb-6">
        N'hésitez pas à consulter nos ressources complémentaires ou à contacter 
        un professionnel de santé pour obtenir des conseils personnalisés.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        
        <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Contacter un spécialiste
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Contacter un spécialiste</DialogTitle>
              <DialogDescription>
                Complétez le formulaire ci-dessous pour envoyer un message à un spécialiste.
              </DialogDescription>
            </DialogHeader>
            <ContactSpecialistForm onClose={() => setContactDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CallToAction;
