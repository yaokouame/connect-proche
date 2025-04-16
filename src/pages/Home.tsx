import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/Layout";
import AdBanner from "@/components/ads/AdBanner";
import AwarenessBanner from "@/components/ads/AwarenessBanner";
import { Heart, Calendar, Map as MapIcon, ShoppingCart, ArrowRight, UserRound, Activity } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handleFindProfessional = () => {
    navigate("/professionals");
  };

  return (
    <Layout>
      {/* Awareness Banner */}
      <AwarenessBanner className="mb-4 md:mb-6" />
      
      {/* Hero section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-r from-health-blue to-health-teal text-white rounded-lg overflow-hidden mb-8 md:mb-12">
        <div className="absolute inset-0 bg-black opacity-5 pattern-dots"></div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            Votre santé, notre priorité
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-6 md:mb-8 opacity-90">
            ConnectProche met en relation les patients et les professionnels de santé
            pour un accès simplifié aux soins de proximité.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link to="/register">
              <Button size={isSmallScreen ? "default" : "lg"} variant="white" className="w-full sm:w-auto shadow-lg">
                S'inscrire
              </Button>
            </Link>
            <Button 
              size={isSmallScreen ? "default" : "lg"} 
              variant="outline" 
              className="border-white text-white hover:bg-health-blue/80 w-full sm:w-auto shadow-lg"
              onClick={handleFindProfessional}
            >
              Rechercher un professionnel
            </Button>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="py-8 md:py-12">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-health-dark mb-2 md:mb-3">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Découvrez comment ConnectProche peut vous aider à prendre soin de votre santé
            et celle de vos proches.
          </p>
        </div>
        
        {/* Services cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <Card className="card-hover border-t-4 border-t-health-blue">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-health-blue/10 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-health-blue" />
              </div>
              <CardTitle className="text-lg">Suivi médical</CardTitle>
              <CardDescription>
                Accédez à votre historique médical et partagez-le avec vos professionnels de santé.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/profile" className="text-health-blue hover:underline flex items-center text-sm">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover border-t-4 border-t-health-teal">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-health-teal/10 flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-health-teal" />
              </div>
              <CardTitle className="text-lg">Rendez-vous en ligne</CardTitle>
              <CardDescription>
                Prenez rendez-vous avec des professionnels de santé en quelques clics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/appointments" className="text-health-blue hover:underline flex items-center text-sm">
                Prendre rendez-vous <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover border-t-4 border-t-green-500">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <UserRound className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Professionnels de santé</CardTitle>
              <CardDescription>
                Trouvez et contactez les professionnels de santé dont vous avez besoin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/professionals" className="text-health-blue hover:underline flex items-center text-sm">
                Voir les professionnels <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover border-t-4 border-t-blue-400">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Activity className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-lg">{t('nav.wellness')}</CardTitle>
              <CardDescription>
                Suivez votre activité physique, nutrition et sommeil pour une meilleure santé.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/wellness" className="text-health-blue hover:underline flex items-center text-sm">
                Accéder <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Premium Banner */}
      <AdBanner className="my-6 md:my-8" />

      {/* CTA section */}
      <section className="py-10 md:py-14 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg my-8 md:my-12 border border-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-health-dark">Prêt à prendre soin de votre santé?</h2>
          <p className="text-lg mb-6 md:mb-8 max-w-2xl mx-auto text-gray-700">
            Rejoignez ConnectProche dès aujourd'hui et profitez de tous nos services pour
            une meilleure gestion de votre santé.
          </p>
          <Link to="/register">
            <Button size={isSmallScreen ? "default" : "lg"} className="bg-health-blue hover:bg-health-teal w-full sm:w-auto shadow-md">
              Créer un compte gratuitement
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
