// This file now serves as a barrel export for all the service modules
// This keeps backward compatibility so existing imports continue to work

export { getPharmacies, getHealthCenters } from './pharmacyService';
export { getProducts } from './productService';
export { getUserAppointments, createAppointment } from './appointmentService';
export { getInsuranceProviders } from './insuranceService';
