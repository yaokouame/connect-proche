
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface OrderFooterProps {
  email: string;
}

const OrderFooter = ({ email }: OrderFooterProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleContactSupport = () => {
    toast({
      title: "Service client",
      description: "Notre équipe vous contactera bientôt à l'adresse " + email,
    });
  };
  
  return (
    <div className="text-center space-y-4 print:hidden">
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button onClick={() => navigate("/products")}>
          Continuer mes achats
        </Button>
        <Button variant="outline" onClick={handleContactSupport}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Contacter le service client
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        Un email de confirmation a été envoyé à {email}
      </p>
    </div>
  );
};

export default OrderFooter;
