
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-center text-lg font-semibold text-gray-900 sm:text-xl">
            Paiement réussi
          </DialogTitle>
          <DialogDescription className="text-center">
            Votre commande #{orderNumber} a été confirmée
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Package className="h-5 w-5 text-gray-400" />
            <p>Nous préparons votre commande et vous enverrons un e-mail de confirmation</p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col sm:space-y-2">
          <Button onClick={onClose} className="mt-2 w-full">
            Voir les détails de la commande
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
