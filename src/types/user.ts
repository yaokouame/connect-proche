
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
  prescriptions?: Prescription[];
  appointments?: Appointment[];
  // New fields for complete health profile
  bloodType?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "unknown";
  vaccinations?: Vaccination[];
  emergencyContact?: EmergencyContact;
}

export interface ProfessionalProfile extends User {
  role: "professional";
  specialty: string;
  license: string;
  experience: number;
  availability?: { day: string; slots: string[] }[];
  appointments?: Appointment[];
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  location: string;
  photoUrl: string;
  rating: number;
  reviewCount: number;
  availability?: { day: string; slots: string[] }[];
  phone: string;
  email: string;
  languages: string[];
  consultationTypes: string[];
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

export interface Prescription {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  medications: PrescribedMedication[];
  instructions: string;
  expiryDate: string;
  status: "active" | "expired" | "completed";
}

export interface PrescribedMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
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

// New interfaces for complete health profile
export interface Vaccination {
  id: string;
  name: string;
  date: string;
  expiryDate?: string;
  batchNumber?: string;
  provider?: string;
  notes?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface MedicalShare {
  id: string;
  patientId: string;
  professionalId?: string;
  token: string;
  expiryDate: string;
  accessLevel: "full" | "partial" | "readonly";
  createdAt: string;
  isActive: boolean;
}
