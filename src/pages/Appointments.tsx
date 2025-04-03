
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useUser } from "@/contexts/UserContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserAppointments, createAppointment } from "@/services/dataService";
import { Appointment } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import AppointmentList from "@/components/appointments/AppointmentList";
import NewAppointmentDialog from "@/components/appointments/NewAppointmentDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AppointmentsPage = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Using React Query for fetching appointments
  const { data: appointments = [], isLoading, isError } = useQuery({
    queryKey: ["appointments", currentUser?.id],
    queryFn: () => getUserAppointments(currentUser?.id || ""),
    enabled: !!currentUser,
  });

  // Cancel appointment mutation
  const cancelAppointmentMutation = useMutation({
    mutationFn: (appointmentId: string) => {
      // This would call an API in a real app
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
    onSuccess: (_, appointmentId) => {
      // Update the appointments list after cancellation
      queryClient.setQueryData<Appointment[]>(["appointments", currentUser?.id], (oldData) => {
        if (!oldData) return [];
        return oldData.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: "cancelled" } 
            : appointment
        );
      });
    }
  });

  // Create appointment mutation
  const createAppointmentMutation = useMutation({
    mutationFn: (appointmentData: any) => {
      return createAppointment({
        ...appointmentData,
        patientId: currentUser?.id,
        professionalId: "pro-123", // Default doctor for demo
      });
    },
    onSuccess: (newAppointment) => {
      // Update the appointments list after creation
      queryClient.setQueryData<Appointment[]>(["appointments", currentUser?.id], (oldData = []) => {
        return [...oldData, newAppointment];
      });
    }
  });

  const handleCreateAppointment = (appointmentData: {
    date: string;
    time: string;
    notes?: string;
  }) => {
    createAppointmentMutation.mutate(appointmentData);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    cancelAppointmentMutation.mutate(appointmentId);
  };

  if (!currentUser) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Connectez-vous pour accéder à vos rendez-vous</h1>
          <p className="mb-8 text-gray-600">
            Vous devez être connecté pour accéder à cette page.
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
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
          <NewAppointmentDialog onCreateAppointment={handleCreateAppointment} />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Liste des rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-health-blue"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-8">
                <p className="text-red-500">Une erreur est survenue lors du chargement de vos rendez-vous.</p>
                <Button 
                  onClick={() => queryClient.invalidateQueries({queryKey: ["appointments", currentUser.id]})} 
                  className="mt-4"
                >
                  Réessayer
                </Button>
              </div>
            ) : (
              <AppointmentList 
                appointments={appointments} 
                onCancelAppointment={handleCancelAppointment} 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
