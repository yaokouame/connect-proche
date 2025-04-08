
import { supabase } from "@/integrations/supabase/client";
import { User, PatientProfile, ProfessionalProfile, InsuranceVoucher, Medication } from "@/types/user";
import { VitalSign, PhysicalActivity, NutritionEntry, HydrationEntry, SleepEntry, WellnessGoal } from "@/types/health";

// User profiles
export const saveUserProfile = async (profile: Partial<User>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role || 'patient',
        profile_image_url: profile.profileImageUrl,
        created_at: profile.created_at || new Date().toISOString(),
        allergies: profile.allergies,
        medications: profile.medications,
        medical_history: profile.medicalHistory,
        blood_type: profile.bloodType,
        is_profile_complete: profile.isProfileComplete,
        is_sharing_medical_data: profile.isSharingMedicalData,
        authorized_doctors: profile.authorizedDoctors
      }, { onConflict: 'id' });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    
    // Map database fields back to camelCase for frontend
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      profileImageUrl: data.profile_image_url,
      created_at: data.created_at,
      allergies: data.allergies,
      medications: data.medications,
      medicalHistory: data.medical_history,
      bloodType: data.blood_type,
      isProfileComplete: data.is_profile_complete,
      isSharingMedicalData: data.is_sharing_medical_data,
      authorizedDoctors: data.authorized_doctors
    };
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Vital signs
export const saveVitalSign = async (vitalSign: Omit<VitalSign, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('vital_signs')
      .insert({
        user_id: vitalSign.userId,
        type: vitalSign.type,
        value: vitalSign.value,
        unit: vitalSign.unit,
        timestamp: vitalSign.timestamp,
        notes: vitalSign.notes,
        device: vitalSign.device
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving vital sign:", error);
    throw error;
  }
};

export const getUserVitalSigns = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('vital_signs')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    
    // Transform data to match frontend structure
    const vitalSignsData = {
      bloodPressure: [],
      heartRate: [],
      bloodSugar: [],
      weight: [],
      temperature: [],
      oxygen: []
    };
    
    data.forEach(sign => {
      const transformedSign = {
        id: sign.id,
        userId: sign.user_id,
        type: sign.type,
        value: sign.value,
        unit: sign.unit,
        timestamp: sign.timestamp,
        notes: sign.notes,
        device: sign.device
      };
      
      switch(sign.type) {
        case 'blood_pressure':
          vitalSignsData.bloodPressure.push(transformedSign);
          break;
        case 'heart_rate':
          vitalSignsData.heartRate.push(transformedSign);
          break;
        case 'blood_sugar':
          vitalSignsData.bloodSugar.push(transformedSign);
          break;
        case 'weight':
          vitalSignsData.weight.push(transformedSign);
          break;
        case 'temperature':
          vitalSignsData.temperature.push(transformedSign);
          break;
        case 'oxygen':
          vitalSignsData.oxygen.push(transformedSign);
          break;
      }
    });
    
    return vitalSignsData;
  } catch (error) {
    console.error("Error getting vital signs:", error);
    throw error;
  }
};

// Insurance vouchers
export const saveInsuranceVoucher = async (voucher: Omit<InsuranceVoucher, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('insurance_vouchers')
      .insert({
        user_id: voucher.userId,
        provider: voucher.provider,
        voucher_number: voucher.voucherNumber,
        coverage_type: voucher.coverageType,
        valid_from: voucher.validFrom,
        valid_until: voucher.validUntil,
        coverage_amount: voucher.coverageAmount,
        is_percentage: voucher.isPercentage,
        status: voucher.status,
        for_service: voucher.forService,
        for_pharmacy: voucher.forPharmacy,
        for_health_center: voucher.forHealthCenter,
        qr_code: voucher.qrCode
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving insurance voucher:", error);
    throw error;
  }
};

export const getUserInsuranceVouchers = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('insurance_vouchers')
      .select('*')
      .eq('user_id', userId)
      .order('valid_until', { ascending: false });

    if (error) throw error;
    
    // Transform data to match frontend structure
    return data.map(voucher => ({
      id: voucher.id,
      userId: voucher.user_id,
      provider: voucher.provider,
      voucherNumber: voucher.voucher_number,
      coverageType: voucher.coverage_type,
      validFrom: voucher.valid_from,
      validUntil: voucher.valid_until,
      coverageAmount: voucher.coverage_amount,
      isPercentage: voucher.is_percentage,
      status: voucher.status,
      forService: voucher.for_service,
      forPharmacy: voucher.for_pharmacy,
      forHealthCenter: voucher.for_health_center,
      qrCode: voucher.qr_code
    }));
  } catch (error) {
    console.error("Error getting insurance vouchers:", error);
    throw error;
  }
};

// Wellness goals
export const saveWellnessGoal = async (goal: Omit<WellnessGoal, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('wellness_goals')
      .insert({
        user_id: goal.userId,
        type: goal.type,
        target: goal.target,
        unit: goal.unit,
        progress: goal.progress,
        start_date: goal.startDate,
        end_date: goal.endDate,
        completed: goal.completed
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving wellness goal:", error);
    throw error;
  }
};

export const getUserWellnessGoals = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('wellness_goals')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false });

    if (error) throw error;
    
    // Transform data to match frontend structure
    return data.map(goal => ({
      id: goal.id,
      userId: goal.user_id,
      type: goal.type,
      target: goal.target,
      unit: goal.unit,
      progress: goal.progress,
      startDate: goal.start_date,
      endDate: goal.end_date,
      completed: goal.completed
    }));
  } catch (error) {
    console.error("Error getting wellness goals:", error);
    throw error;
  }
};

// Add more database service functions as needed for other data types
