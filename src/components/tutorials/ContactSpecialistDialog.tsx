
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormState {
  subject: string;
  message: string;
  specialty: string;
}

const ContactSpecialistDialog: React.FC = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState<ContactFormState>({
    subject: "",
    message: "",
    specialty: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé au spécialiste. Vous serez contacté prochainement.",
    });
    setContactForm({ subject: "", message: "", specialty: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setContactForm(prev => ({ ...prev, specialty: value }));
  };

  return (
    <Dialog>
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
        <form onSubmit={handleContactSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="specialty">Spécialité</Label>
            <Select 
              value={contactForm.specialty}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une spécialité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiologie</SelectItem>
                <SelectItem value="dermatology">Dermatologie</SelectItem>
                <SelectItem value="general">Médecine générale</SelectItem>
                <SelectItem value="neurology">Neurologie</SelectItem>
                <SelectItem value="pediatrics">Pédiatrie</SelectItem>
                <SelectItem value="psychiatry">Psychiatrie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input 
              id="subject" 
              name="subject"
              value={contactForm.subject}
              onChange={handleInputChange}
              placeholder="Sujet de votre message"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              name="message"
              value={contactForm.message}
              onChange={handleInputChange}
              placeholder="Décrivez votre question ou préoccupation..."
              required
              rows={5}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">Envoyer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSpecialistDialog;
