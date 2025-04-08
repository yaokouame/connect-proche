export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'professional' | 'none';
  profileImageUrl?: string;
  created_at?: string;
  allergies?: string[];
  medications?: string[];
  medicalHistory?: string[];
  vaccinations?: Vaccination[];
  emergencyContact?: EmergencyContact;
  insuranceInfo?: InsuranceInfo;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
  preferences?: {
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    accessibility: {
      fontSize: 'small' | 'medium' | 'large';
      highContrast: boolean;
    };
  };
  isProfileComplete?: boolean;
  isSharingMedicalData?: boolean;
  authorizedDoctors?: string[];
}

export type UserRole = 'patient' | 'professional' | 'none';

export interface PatientProfile extends User {
  role: 'patient';
  dateOfBirth?: string;
  allergies?: string[];
  medications?: string[];
  medicalHistory?: string[];
  vaccinations?: Vaccination[];
  emergencyContact?: EmergencyContact;
  insuranceInfo?: InsuranceInfo;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
}

export interface ProfessionalProfile extends User {
  role: 'professional';
  specialty?: string;
  license?: string;
  experience?: number;
  verified?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  profileImage: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  experience: number;
  location: string;
  availableSlots?: string[];
  fees?: {
    consultation: number;
    followUp: number;
  };
  acceptedInsuranceProviders?: string[];
  bio?: string;
  education?: string[];
  languages?: string[];
  phone?: string;
  email?: string;
  consultationTypes?: string[];
}

export interface Medication {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
  startDate?: string;
  endDate?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
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
  status: 'active' | 'used' | 'expired';
  qrCodeUrl?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  insuranceVoucherId?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  date: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'completed';
  medications: PrescribedMedication[];
  instructions: string;
  prescriptionImage?: PrescriptionFile;
}

export interface PrescribedMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface PrescriptionFile {
  id: string;
  fileUrl: string;
  fileName: string;
  uploadDate: string;
  verified?: boolean;
  verifiedBy?: string;
  verificationDate?: string;
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
  insuranceCoverage?: {
    eligible: boolean;
    coveragePercentage?: number;
    requiresVoucher?: boolean;
  };
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
  acceptedInsuranceProviders: string[];
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
  acceptedInsuranceProviders: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  prescription?: Prescription;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderDate: string;
  deliveryDate?: string;
  prescriptionId?: string;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface Vaccination {
  id: string;
  name: string;
  date: string;
  expiryDate?: string;
  batchNumber?: string;
  provider?: string;
  notes?: string;
}
