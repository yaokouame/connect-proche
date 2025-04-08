
/**
 * Utility functions for localStorage operations
 */

/**
 * Retrieve item from localStorage and parse it as JSON
 */
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Save item to localStorage as JSON
 */
export const setStorageItem = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * Add item to an array in localStorage
 */
export const addItemToStorageArray = <T>(key: string, newItem: T): T[] => {
  const existingItems = getStorageItem<T[]>(key, []);
  const updatedItems = [...existingItems, newItem];
  setStorageItem(key, updatedItems);
  return updatedItems;
};
