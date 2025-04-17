
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Create schema for medication form validation
const medicationFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom du médicament est requis" }),
  dosage: z.string().optional(),
  frequency: z.string().optional(),
  duration: z.string().optional(),
  instructions: z.string().optional(),
});

export type MedicationFormValues = z.infer<typeof medicationFormSchema>;

interface MedicationFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MedicationFormValues) => void;
}

const MedicationForm = ({ isOpen, onOpenChange, onSubmit }: MedicationFormProps) => {
  const { toast } = useToast();

  // Setup form with validation
  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  });

  const handleSubmit = (data: MedicationFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un médicament</DialogTitle>
        </DialogHeader>
          
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du médicament</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Doliprane" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              
            <FormField
              control={form.control}
              name="dosage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosage</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 1000mg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fréquence</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 3 fois par jour" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durée</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 7 jours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Prendre avec de la nourriture" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
              >
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationForm;
