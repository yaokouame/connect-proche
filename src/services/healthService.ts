
import { VitalSign, ConnectedDevice } from "@/types/health";

// Mock data generator for vital signs
const generateMockVitalSigns = (
  userId: string,
  type: VitalSign['type'],
  count: number,
  baseValue: number,
  variance: number,
  unit: string
): VitalSign[] => {
  const result: VitalSign[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    // Generate data points for the last 30 days
    const date = new Date(now);
    date.setDate(date.getDate() - (count - i - 1));
    
    // Add some randomness to the value
    const randomVariance = (Math.random() - 0.5) * variance;
    let value: number | string = baseValue + randomVariance;
    
    // Format blood pressure as "systolic/diastolic"
    if (type === 'blood_pressure') {
      const diastolic = Math.round(value * 0.65);
      value = `${Math.round(value)}/${diastolic}`;
    } else {
      value = Math.round(value * 10) / 10; // Round to 1 decimal place
    }
    
    result.push({
      id: `${type}-${i}`,
      userId,
      type,
      value,
      unit,
      timestamp: date.toISOString(),
      notes: i % 5 === 0 ? "Mesure après activité physique" : undefined,
      device: i % 3 === 0 ? "Montre connectée" : "Application mobile"
    });
  }
  
  return result;
};

// Mock data service for health metrics
export const getUserVitalSigns = async (userId: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    bloodPressure: generateMockVitalSigns(userId, 'blood_pressure', 30, 120, 10, 'mmHg'),
    heartRate: generateMockVitalSigns(userId, 'heart_rate', 30, 75, 15, 'bpm'),
    bloodSugar: generateMockVitalSigns(userId, 'blood_sugar', 30, 5.6, 1.2, 'mmol/L'),
    weight: generateMockVitalSigns(userId, 'weight', 30, 70, 2, 'kg'),
    temperature: generateMockVitalSigns(userId, 'temperature', 30, 36.8, 0.5, '°C'),
    oxygen: generateMockVitalSigns(userId, 'oxygen', 30, 97, 2, '%')
  };
};

// Mock data for connected devices
export const getUserConnectedDevices = async (userId: string): Promise<ConnectedDevice[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'device-1',
      name: 'Montre Fitbit Versa 3',
      type: 'smartwatch',
      lastSync: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      status: 'connected'
    },
    {
      id: 'device-2',
      name: 'Tensiomètre Omron X7',
      type: 'blood_pressure_monitor',
      lastSync: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: 'connected'
    },
    {
      id: 'device-3',
      name: 'Balance connectée Withings Body+',
      type: 'scale',
      lastSync: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: 'connected'
    },
    {
      id: 'device-4',
      name: 'Glucomètre FreeStyle Libre',
      type: 'glucose_monitor',
      lastSync: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      status: 'disconnected'
    }
  ];
};

// Add a new vital sign reading
export const addVitalSignReading = async (reading: Omit<VitalSign, 'id'>): Promise<VitalSign> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would be a POST to an API
  return {
    ...reading,
    id: `reading-${Date.now()}`
  };
};

// Connect a new device
export const connectDevice = async (deviceInfo: { name: string; type: string }): Promise<ConnectedDevice> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would initiate a device pairing process
  return {
    id: `device-${Date.now()}`,
    name: deviceInfo.name,
    type: deviceInfo.type,
    lastSync: new Date().toISOString(),
    status: 'connected'
  };
};
