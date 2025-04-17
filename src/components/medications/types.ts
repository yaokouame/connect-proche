
import { PrescribedMedication } from "@/types/user";

export interface Medication extends PrescribedMedication {
  id: string;
  prescriptionId: string;
  isActive: boolean;
}

export interface MedicationListProps {
  medications?: Medication[];
}
