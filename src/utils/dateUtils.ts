
/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Formats a date string to a localized format
 * @param dateString - Date string in any valid format (ISO, etc.)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Date inconnue';
  
  try {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      // Try to handle different date formats (DD/MM/YYYY)
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return `${day}/${month}/${year}`;
      }
      return dateString;
    }
    
    // Format the date using the browser's locale
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Converts a date string to ISO format (YYYY-MM-DD)
 * @param dateString - Date string in any format
 * @returns ISO formatted date
 */
export const toISODate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error converting date to ISO:', error);
    return dateString;
  }
};
