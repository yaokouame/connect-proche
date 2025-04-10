
/**
 * Formats a date string to a localized format
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Date inconnue';
  
  try {
    // Check if already formatted as DD/MM/YYYY
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      return dateString;
    }
    
    const date = new Date(dateString);
    
    // Format to French locale date
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date invalide';
  }
};

/**
 * Checks if a date is in the past
 */
export const isDateExpired = (dateString: string): boolean => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    const today = new Date();
    
    // Reset time portion for accurate date comparison
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    return date < today;
  } catch (error) {
    console.error('Error checking date expiration:', error);
    return false;
  }
};
