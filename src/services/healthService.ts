
import { VitalSign, ConnectedDevice } from "@/types/health";

export const getVitalSigns = (userId: string): VitalSign[] => {
  // Mock data - in a real app, this would come from an API
  return [
    {
      id: "vs1",
      userId,
      type: "blood_pressure",
      value: "120/80",
      unit: "mmHg",
      timestamp: "2023-03-25T08:30:00",
      notes: "Morning reading",
    },
    {
      id: "vs2",
      userId,
      type: "heart_rate",
      value: "72",
      unit: "bpm",
      timestamp: "2023-03-25T08:35:00",
      notes: "Resting",
    },
    {
      id: "vs3",
      userId,
      type: "blood_sugar",
      value: "100",
      unit: "mg/dL",
      timestamp: "2023-03-25T07:15:00",
      notes: "Fasting",
    },
    {
      id: "vs4",
      userId,
      type: "weight",
      value: "70.5",
      unit: "kg",
      timestamp: "2023-03-25T07:00:00",
    },
    {
      id: "vs5",
      userId,
      type: "temperature",
      value: "36.6",
      unit: "°C",
      timestamp: "2023-03-24T19:30:00",
    },
    {
      id: "vs6",
      userId,
      type: "blood_pressure",
      value: "118/78",
      unit: "mmHg",
      timestamp: "2023-03-24T08:30:00",
      notes: "Morning reading",
    },
    {
      id: "vs7",
      userId,
      type: "heart_rate",
      value: "75",
      unit: "bpm",
      timestamp: "2023-03-24T08:35:00",
      notes: "Resting",
    },
  ];
};

// Alias for getVitalSigns to match what's imported in HealthTracker.tsx
export const getUserVitalSigns = (userId: string) => {
  // Transform data to match frontend structure
  const allSigns = getVitalSigns(userId);
  const vitalSignsData = {
    bloodPressure: allSigns.filter(sign => sign.type === "blood_pressure"),
    heartRate: allSigns.filter(sign => sign.type === "heart_rate"),
    bloodSugar: allSigns.filter(sign => sign.type === "blood_sugar"),
    weight: allSigns.filter(sign => sign.type === "weight"),
    temperature: allSigns.filter(sign => sign.type === "temperature"),
    oxygen: allSigns.filter(sign => sign.type === "oxygen") || [],
  };
  
  return vitalSignsData;
};

export const addVitalSign = (
  userId: string,
  vitalSign: Omit<VitalSign, "id" | "userId" | "timestamp">
): VitalSign => {
  // In a real app, this would be sent to an API
  const newVitalSign: VitalSign = {
    id: `vs-${Date.now()}`,
    userId,
    timestamp: new Date().toISOString(),
    ...vitalSign,
  };
  
  return newVitalSign;
};

// Alias for addVitalSign to match what's imported in HealthTracker.tsx
export const addVitalSignReading = (reading: Omit<VitalSign, "id">) => {
  const newReading = addVitalSign(reading.userId, {
    type: reading.type,
    value: reading.value,
    unit: reading.unit,
    notes: reading.notes,
    device: reading.device
  });
  
  return newReading;
};

// Mock user connected devices
export const getUserConnectedDevices = (userId: string): ConnectedDevice[] => {
  return [
    {
      id: "dev-1",
      name: "Samsung Galaxy Watch 4",
      type: "smartwatch",
      lastSync: "2023-09-01T14:30:00",
      status: "connected"
    },
    {
      id: "dev-2",
      name: "Withings Blood Pressure Monitor",
      type: "blood_pressure",
      lastSync: "2023-08-28T09:15:00",
      status: "connected"
    },
    {
      id: "dev-3",
      name: "Fitbit Versa 3",
      type: "fitness_tracker",
      lastSync: "2023-09-02T07:45:00",
      status: "disconnected"
    }
  ];
};

// Connect a new device
export const connectDevice = async (deviceInfo: { name: string; type: string }) => {
  // In a real app, this would register the device with the user account
  const newDevice: ConnectedDevice = {
    id: `dev-${Date.now()}`,
    name: deviceInfo.name,
    type: deviceInfo.type,
    lastSync: new Date().toISOString(),
    status: "connected"
  };
  
  return newDevice;
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
