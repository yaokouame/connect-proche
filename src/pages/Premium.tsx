
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    "Accès illimité aux professionnels de santé",
    "Prise de rendez-vous prioritaire",
    "Consultations vidéo illimitées",
    "Suivi personnalisé de votre santé",
    "Assistance médicale 24/7"
  ];

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-health-blue mb-8">ConnectProche Premium</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Découvrez nos avantages premium</CardTitle>
              <CardDescription>
                Un accès complet à tous nos services pour une meilleure prise en charge de votre santé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-health-teal mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
                
                <div className="mt-6">
                  <Button 
                    size="lg" 
                    className="bg-health-blue hover:bg-health-blue/90"
                    onClick={() => navigate("/profile")}
                  >
                    Activer maintenant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tarifs</CardTitle>
              <CardDescription>
                Nos offres adaptées à vos besoins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-health-teal/10 p-4 rounded-lg">
                  <div className="font-semibold text-health-teal mb-1">Mensuel</div>
                  <div className="text-2xl font-bold">12 000 F CFA<span className="text-sm font-normal text-gray-500">/mois</span></div>
                  <div className="text-sm text-gray-500 mt-1">Sans engagement</div>
                </div>
                
                <div className="bg-health-blue/10 p-4 rounded-lg border-2 border-health-blue">
                  <div className="font-semibold text-health-blue mb-1">Annuel <span className="bg-health-blue text-white text-xs px-2 py-0.5 rounded ml-2">-20%</span></div>
                  <div className="text-2xl font-bold">9 600 F CFA<span className="text-sm font-normal text-gray-500">/mois</span></div>
                  <div className="text-sm text-gray-500 mt-1">Facturé annuellement</div>
                </div>
                
                <div className="text-sm text-gray-500 mt-4">
                  * Les prix incluent toutes les taxes applicables
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Questions fréquentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Comment fonctionne l'abonnement premium ?</h3>
                <p className="text-gray-600 mt-1">L'abonnement premium vous donne un accès illimité à tous nos services de santé, y compris les consultations vidéo et le suivi personnalisé.</p>
              </div>
              <div>
                <h3 className="font-semibold">Puis-je annuler à tout moment ?</h3>
                <p className="text-gray-600 mt-1">Oui, vous pouvez annuler votre abonnement à tout moment depuis votre profil. Pour l'offre mensuelle, le service reste actif jusqu'à la fin de la période en cours.</p>
              </div>
              <div>
                <h3 className="font-semibold">L'abonnement est-il remboursé par l'assurance maladie ?</h3>
                <p className="text-gray-600 mt-1">Certaines assurances complémentaires prennent en charge une partie de l'abonnement. Vérifiez auprès de votre assurance.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Premium;
