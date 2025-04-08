
import React from "react";
import { Check } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentSuccessDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  orderNumber: string;
}

const PaymentSuccessDialog = ({ 
  isOpen, 
  onOpenChange, 
  onClose, 
  orderNumber 
}: PaymentSuccessDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center text-green-600">
            <Check className="mr-2 h-6 w-6" />
            Paiement réussi
          </DialogTitle>
          <DialogDescription>
            Votre commande a été confirmée et sera traitée dans les plus brefs délais.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-2">Numéro de commande: <span className="font-medium">{orderNumber}</span></p>
          <p>Un e-mail de confirmation vous a été envoyé.</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Voir les détails de ma commande</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
