
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
  userId: string;
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
  qrCode?: string;
  uploadDate?: string;
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
  rating?: number;
  placeId?: string;
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
  rating?: number;
  placeId?: string;
}
