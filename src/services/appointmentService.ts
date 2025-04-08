
import { Appointment } from "@/types/user";

// Mock appointments data
export const getUserAppointments = async (userId: string): Promise<Appointment[]> => {
  // In a real app, this would be an API call filtered by userId
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "apt-1",
      patientId: "patient-456",
      professionalId: "pro-123",
      date: "2023-10-15",
      time: "14:30",
      status: "scheduled",
      notes: "Consultation générale",
      insuranceVoucherId: "voucher-123"
    },
    {
      id: "apt-2",
      patientId: "patient-456",
      professionalId: "pro-124",
      date: "2023-09-25",
      time: "10:00",
      status: "completed",
      notes: "Suivi traitement paludisme",
    },
  ];
};

// Mock appointment creation
export const createAppointment = async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    patientId: appointmentData.patientId || "",
    professionalId: appointmentData.professionalId || "",
    date: appointmentData.date || "",
    time: appointmentData.time || "",
    status: "scheduled",
    notes: appointmentData.notes,
    insuranceVoucherId: appointmentData.insuranceVoucherId
  };
  
  return newAppointment;
};
