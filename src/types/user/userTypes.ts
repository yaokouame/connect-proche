
// Common user types shared across different user roles
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'professional' | 'none';
  profileImageUrl?: string;
  created_at?: string;
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
  location?: {
    city: string;
    region: string;
    address?: string;
  };
}

export type UserRole = 'patient' | 'professional' | 'none';

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}
