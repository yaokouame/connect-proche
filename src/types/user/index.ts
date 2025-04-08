
// This file re-exports all user-related types for backward compatibility
export * from './userTypes';
export * from './patientTypes';
export * from './professionalTypes';
export * from './prescriptionTypes';
export * from './insuranceTypes';
export * from './orderTypes';

// Re-export the Pharmacy type from patientTypes as PharmacyLocation to avoid conflict
export type { Pharmacy as PharmacyLocation } from './patientTypes';
