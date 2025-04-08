
import { User } from './userTypes';

export interface ProfessionalProfile extends User {
  role: 'professional';
  specialty?: string;
  license?: string;
  experience?: number;
  verified?: boolean;
  averageRating?: number;
  reviewCount?: number;
  location?: {
    city: string;
    region: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
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
