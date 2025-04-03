
export interface VitalSign {
  id: string;
  userId: string;
  type: 'blood_pressure' | 'heart_rate' | 'blood_sugar' | 'weight' | 'temperature' | 'oxygen';
  value: number | string;
  unit: string;
  timestamp: string;
  notes?: string;
  device?: string;
}

export interface VitalSignsData {
  bloodPressure: VitalSign[];
  heartRate: VitalSign[];
  bloodSugar: VitalSign[];
  weight: VitalSign[];
  temperature: VitalSign[];
  oxygen: VitalSign[];
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: string;
  lastSync: string;
  status: 'connected' | 'disconnected' | 'pairing';
}
