
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
import VisitorCounter from "@/components/analytics/VisitorCounter";
import { Heart, Calendar, Map as MapIcon, ShoppingCart, ArrowRight, UserRound, Activity } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const Home = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handleFindProfessional = () => {
    navigate("/professionals");
  };

  return (
    <Layout>
      {/* Awareness Banner */}
      <AwarenessBanner className="mb-4 md:mb-6" />
      
      {/* Hero section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-health-blue to-health-teal text-white rounded-lg overflow-hidden mb-8 md:mb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            Votre santé, notre priorité
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl">
            ConnectProche met en relation les patients et les professionnels de santé
            pour un accès simplifié aux soins de proximité.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link to="/register">
              <Button size={isSmallScreen ? "default" : "lg"} className="bg-white text-health-blue hover:bg-gray-100 w-full sm:w-auto">
                S'inscrire
              </Button>
            </Link>
            <Button 
              size={isSmallScreen ? "default" : "lg"} 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 w-full sm:w-auto whitespace-normal sm:whitespace-nowrap"
              onClick={handleFindProfessional}
            >
              Rechercher un professionnel
            </Button>
          </div>
          
          {/* Visitor Counter - positioned at the bottom of hero section */}
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
            <VisitorCounter variant="home" />
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-health-dark mb-2 md:mb-3">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Découvrez comment ConnectProche peut vous aider à prendre soin de votre santé
            et celle de vos proches.
          </p>
        </div>
        
        {/* Services cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-health-blue/10 flex items-center justify-center mb-3 md:mb-4">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-health-blue" />
              </div>
              <CardTitle className="text-lg md:text-xl">Suivi médical</CardTitle>
              <CardDescription>
                Accédez à votre historique médical et partagez-le avec vos professionnels de santé.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/profile" className="text-health-blue hover:underline flex items-center text-sm md:text-base">
                En savoir plus <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-health-teal/10 flex items-center justify-center mb-3 md:mb-4">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-health-teal" />
              </div>
              <CardTitle className="text-lg md:text-xl">Rendez-vous en ligne</CardTitle>
              <CardDescription>
                Prenez rendez-vous avec des professionnels de santé en quelques clics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/appointments" className="text-health-blue hover:underline flex items-center text-sm md:text-base">
                Prendre rendez-vous <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-health-green/10 flex items-center justify-center mb-3 md:mb-4">
                <UserRound className="w-5 h-5 md:w-6 md:h-6 text-health-green" />
              </div>
              <CardTitle className="text-lg md:text-xl">Professionnels de santé</CardTitle>
              <CardDescription>
                Trouvez et contactez les professionnels de santé dont vous avez besoin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/professionals" className="text-health-blue hover:underline flex items-center text-sm md:text-base">
                Voir les professionnels <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-health-blue/10 flex items-center justify-center mb-3 md:mb-4">
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-health-blue" />
              </div>
              <CardTitle className="text-lg md:text-xl">Bien-être & Prévention</CardTitle>
              <CardDescription>
                Suivez votre activité physique, nutrition et sommeil pour une meilleure santé.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/wellness" className="text-health-blue hover:underline flex items-center text-sm md:text-base">
                Accéder <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Premium Banner */}
      <AdBanner className="my-6 md:my-8" />

      {/* CTA section */}
      <section className="py-10 md:py-16 bg-health-light rounded-lg my-8 md:my-12 mx-4">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Prêt à prendre soin de votre santé?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Rejoignez ConnectProche dès aujourd'hui et profitez de tous nos services pour
            une meilleure gestion de votre santé.
          </p>
          <Link to="/register">
            <Button size={isSmallScreen ? "default" : "lg"} className="bg-health-blue hover:bg-health-teal w-full sm:w-auto">
              Créer un compte gratuitement
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
