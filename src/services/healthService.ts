
import { VitalSign } from "@/types/health";

export const getVitalSigns = (userId: string): VitalSign[] => {
  // Mock data - in a real app, this would come from an API
  return [
    {
      id: "vs1",
      userId,
      type: "blood-pressure",
      value: "120/80",
      unit: "mmHg",
      date: "2023-03-25T08:30:00",
      notes: "Morning reading",
    },
    {
      id: "vs2",
      userId,
      type: "heart-rate",
      value: "72",
      unit: "bpm",
      date: "2023-03-25T08:35:00",
      notes: "Resting",
    },
    {
      id: "vs3",
      userId,
      type: "blood-glucose",
      value: "100",
      unit: "mg/dL",
      date: "2023-03-25T07:15:00",
      notes: "Fasting",
    },
    {
      id: "vs4",
      userId,
      type: "weight",
      value: "70.5",
      unit: "kg",
      date: "2023-03-25T07:00:00",
    },
    {
      id: "vs5",
      userId,
      type: "temperature",
      value: "36.6",
      unit: "°C",
      date: "2023-03-24T19:30:00",
    },
    {
      id: "vs6",
      userId,
      type: "blood-pressure",
      value: "118/78",
      unit: "mmHg",
      date: "2023-03-24T08:30:00",
      notes: "Morning reading",
    },
    {
      id: "vs7",
      userId,
      type: "heart-rate",
      value: "75",
      unit: "bpm",
      date: "2023-03-24T08:35:00",
      notes: "Resting",
    },
  ];
};

export const addVitalSign = (
  userId: string,
  vitalSign: Omit<VitalSign, "id" | "userId" | "date">
): VitalSign => {
  // In a real app, this would be sent to an API
  const newVitalSign: VitalSign = {
    id: `vs-${Date.now()}`,
    userId,
    date: new Date().toISOString(),
    ...vitalSign,
  };
  
  return newVitalSign;
};

// Add mock function for medication reminders to fix the import error
export interface MedicationReminder {
  id: string;
  medicationName: string;
  time: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  active: boolean;
}

export const getMedicationReminders = (userId: string): MedicationReminder[] => {
  // Mock data - in a real app, this would come from an API
  return [
    {
      id: "rem-1",
      medicationName: "Amoxicilline",
      time: "8:00",
      frequency: "daily",
      startDate: "2023-09-15",
      endDate: "2023-09-22",
      notes: "Prendre avec de la nourriture",
      active: true
    },
    {
      id: "rem-2",
      medicationName: "Doliprane",
      time: "14:00",
      frequency: "asNeeded",
      startDate: "2023-08-20",
      notes: "Prendre en cas de douleur",
      active: true
    }
  ];
};
