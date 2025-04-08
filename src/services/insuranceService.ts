
import { InsuranceVoucher } from "@/types/user";
import { getStorageItem, addItemToStorageArray } from "./storage/localStorageUtils";

/**
 * Services for insurance operations
 */

/**
 * Save insurance voucher to localStorage
 */
export const saveInsuranceVoucher = async (voucher: Omit<InsuranceVoucher, 'id'>) => {
  try {
    console.log("Saving insurance voucher:", voucher);
    
    // Generate an ID
    const newVoucher = {
      id: `voucher-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...voucher
    };
    
    // Store in localStorage
    const key = `insurance_vouchers_${voucher.userId}`;
    addItemToStorageArray(key, newVoucher);
    
    return newVoucher;
  } catch (error) {
    console.error("Error saving insurance voucher:", error);
    throw error;
  }
};

/**
 * Get insurance vouchers for user from localStorage
 */
export const getUserInsuranceVouchers = async (userId: string) => {
  try {
    console.log("Getting insurance vouchers for user:", userId);
    
    // Retrieve from localStorage
    const key = `insurance_vouchers_${userId}`;
    return getStorageItem<InsuranceVoucher[]>(key, []);
  } catch (error) {
    console.error("Error getting insurance vouchers:", error);
    throw error;
  }
};
