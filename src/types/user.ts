
export type UserRole = "patient" | "professional" | "none";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImageUrl?: string;
}

export interface PatientProfile extends User {
  role: "patient";
  dateOfBirth?: string;
  medicalHistory?: string[];
  medications?: string[];
  allergies?: string[];
  appointments?: Appointment[];
}

export interface ProfessionalProfile extends User {
  role: "professional";
  specialty: string;
  license: string;
  experience: number;
  availability?: { day: string; slots: string[] }[];
  appointments?: Appointment[];
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface HealthCenter {
  id: string;
  name: string;
  type: string;
  services: string[];
  address: string;
  phone: string;
  hours: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  inStock: boolean;
  requiresPrescription: boolean;
}
