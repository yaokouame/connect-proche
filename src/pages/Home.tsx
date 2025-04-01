
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Heart, Calendar, Map as MapIcon, ShoppingCart, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="relative py-20 bg-gradient-to-br from-health-blue to-health-teal text-white rounded-lg overflow-hidden mb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Votre santé, notre priorité
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            ConnectProche met en relation les patients et les professionnels de santé
            pour un accès simplifié aux soins de proximité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-health-blue hover:bg-gray-100">
                S'inscrire
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Trouver un professionnel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-health-dark mb-3">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez comment ConnectProche peut vous aider à prendre soin de votre santé
            et celle de vos proches.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-health-blue/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-health-blue" />
              </div>
              <CardTitle className="text-xl">Suivi médical</CardTitle>
              <CardDescription>
                Accédez à votre historique médical et partagez-le avec vos professionnels de santé.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/register" className="text-health-blue hover:underline flex items-center">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-health-teal/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-health-teal" />
              </div>
              <CardTitle className="text-xl">Rendez-vous en ligne</CardTitle>
              <CardDescription>
                Prenez rendez-vous avec des professionnels de santé en quelques clics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/appointments" className="text-health-blue hover:underline flex items-center">
                Prendre rendez-vous <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-health-green/10 flex items-center justify-center mb-4">
                <MapIcon className="w-6 h-6 text-health-green" />
              </div>
              <CardTitle className="text-xl">Établissements de proximité</CardTitle>
              <CardDescription>
                Localisez les pharmacies et centres de santé près de chez vous.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/map" className="text-health-blue hover:underline flex items-center">
                Explorer la carte <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-health-blue/10 flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-health-blue" />
              </div>
              <CardTitle className="text-xl">Pharmacie en ligne</CardTitle>
              <CardDescription>
                Commandez vos médicaments et produits de santé en ligne.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/products" className="text-health-blue hover:underline flex items-center">
                Voir les produits <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-health-light rounded-lg my-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à prendre soin de votre santé?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez ConnectProche dès aujourd'hui et profitez de tous nos services pour
            une meilleure gestion de votre santé.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-health-blue hover:bg-health-teal">
              Créer un compte gratuitement
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
