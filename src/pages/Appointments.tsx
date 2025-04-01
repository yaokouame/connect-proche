
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Appointment } from "@/types/user";
import { getUserAppointments, createAppointment } from "@/services/dataService";
import { Calendar, Clock, User } from "lucide-react";
import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const AppointmentsPage = () => {
  const { currentUser } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const data = await getUserAppointments(currentUser.id);
          setAppointments(data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [currentUser]);

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsBooking(true);
    try {
      const newAppointment = await createAppointment({
        patientId: currentUser.id,
        professionalId: "pro-123", // Using default professional for now
        date,
        time,
        notes,
      });

      setAppointments([...appointments, newAppointment]);
      
      toast({
        title: "Rendez-vous confirmé",
        description: `Votre rendez-vous est programmé pour le ${date} à ${time}.`,
      });

      // Reset form
      setDate("");
      setTime("");
      setNotes("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de réserver ce rendez-vous. Veuillez réessayer.",
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (!currentUser) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Connectez-vous pour gérer vos rendez-vous</h1>
          <p className="mb-8 text-gray-600">
            Vous devez être connecté pour accéder à vos rendez-vous et en prendre de nouveaux.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button>Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">S'inscrire</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-health-dark">Mes rendez-vous</h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="book">Prendre un rendez-vous</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {loading ? (
              <div className="text-center py-8">
                <p>Chargement de vos rendez-vous...</p>
              </div>
            ) : appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Consultation</CardTitle>
                          <CardDescription>{appointment.notes}</CardDescription>
                        </div>
                        <Badge
                          className={
                            appointment.status === "scheduled"
                              ? "bg-blue-500"
                              : appointment.status === "completed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }
                        >
                          {appointment.status === "scheduled"
                            ? "À venir"
                            : appointment.status === "completed"
                            ? "Terminé"
                            : "Annulé"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-health-blue" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-health-blue" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-2 text-health-blue" />
                          <span>Dr. Jean Michel</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                      {appointment.status === "scheduled" && (
                        <Button variant="destructive" size="sm">
                          Annuler
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Aucun rendez-vous à venir</h3>
                <p className="text-gray-500 mb-6">
                  Vous n'avez pas encore de rendez-vous programmés.
                </p>
                <Button onClick={() => document.querySelector('button[value="book"]')?.click()}>
                  Prendre un rendez-vous
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="book" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Prendre un nouveau rendez-vous</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous pour planifier votre consultation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBookAppointment} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Heure</Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="professional">Professionnel de santé</Label>
                    <select
                      id="professional"
                      className="w-full rounded-md border border-input px-3 py-2 bg-background"
                      value={professionalId}
                      onChange={(e) => setProfessionalId(e.target.value)}
                      required
                    >
                      <option value="">Sélectionnez un professionnel</option>
                      <option value="pro-123">Dr. Jean Michel - Médecin généraliste</option>
                      <option value="pro-124">Dr. Sophie Martin - Cardiologue</option>
                      <option value="pro-125">Dr. Thomas Petit - Dermatologue</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Motif de consultation</Label>
                    <Input
                      id="notes"
                      placeholder="Ex: Consultation générale, suivi, douleur..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isBooking}>
                    {isBooking ? "Réservation en cours..." : "Confirmer le rendez-vous"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
