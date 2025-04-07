
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
  // New field for insurance information
  insuranceInfo?: InsuranceInfo;
  insuranceVouchers?: InsuranceVoucher[];
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  membershipNumber: string;
  validUntil: string;
  coverageType?: string;
  coveragePercentage?: number;
}

export interface InsuranceVoucher {
  id: string;
  provider: string;
  voucherNumber: string;
  validFrom: string;
  validUntil: string;
  coverageType: string;
  coverageAmount: number;
  isPercentage: boolean;
  forService?: string;
  forPharmacy?: string;
  forHealthCenter?: string;
  status: "active" | "used" | "expired";
  qrCodeUrl?: string;
}

export interface ProfessionalProfile extends User {
  role: "professional";
  specialty: string;
  license: string;
  experience: number;
  // New fields for verification and rating
  verified?: boolean;
  verificationDetails?: VerificationDetails;
  averageRating?: number;
  reviewCount?: number;
  availability?: { day: string; slots: string[] }[];
  appointments?: Appointment[];
  // New field for accepted insurance providers
  acceptedInsuranceProviders?: string[];
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
  // New fields for verification
  verified?: boolean;
  verificationDetails?: VerificationDetails;
  // New field for accepted insurance providers
  acceptedInsuranceProviders?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  // New field for insurance voucher
  insuranceVoucherId?: string;
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
  // New field for insurance coverage
  insuranceCoverage?: {
    covered: boolean;
    coveragePercentage?: number;
    voucherId?: string;
  };
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
  // New field for accepted insurance providers
  acceptedInsuranceProviders?: string[];
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
  // New field for accepted insurance providers
  acceptedInsuranceProviders?: string[];
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
  // New field for insurance coverage
  insuranceCoverage?: {
    eligible: boolean;
    coveragePercentage?: number;
    requiresVoucher?: boolean;
  };
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

// New interface for professional verification
export interface VerificationDetails {
  diplomaUrls?: string[];
  licenseUrl?: string;
  certificationUrls?: string[];
  verificationDate?: string;
  verificationStatus: "pending" | "verified" | "rejected";
  verificationComments?: string;
}

// Interface for doctor reviews
export interface DoctorReview {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean; // If the review is from a verified patient who had an appointment
}
