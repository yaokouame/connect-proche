
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";

interface ContactForm {
  subject: string;
  message: string;
  specialty: string;
}

interface ContactSpecialistFormProps {
  onClose: () => void;
}

const ContactSpecialistForm: React.FC<ContactSpecialistFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = React.useState<ContactForm>({
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
    onClose();
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
      <Button type="submit" className="w-full">Envouter</Button>
    </form>
  );
};

export default ContactSpecialistForm;
