
// This file re-exports all user-related types for backward compatibility
export * from './userTypes';
export * from './patientTypes';
export * from './professionalTypes';
export * from './prescriptionTypes';
export * from './insuranceTypes';
export * from './orderTypes';

// Re-export the Pharmacy type from patientTypes as PharmacyLocation to avoid ambiguity
// Using a different approach to avoid the "already exported" error
import { Pharmacy } from './patientTypes';
export type { Pharmacy };
export type PharmacyLocation = Pharmacy;
