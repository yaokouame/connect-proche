
import { PrescribedMedication } from "@/types/user";

export interface Medication extends PrescribedMedication {
  id: string;
  prescriptionId: string;
  isActive: boolean;
  lastTaken?: string; // ISO date string of when last taken
  lastSkipped?: string; // ISO date string of when last skipped
  status?: 'taken' | 'skipped' | null; // Current status
}

export interface MedicationListProps {
  medications?: Medication[];
}
