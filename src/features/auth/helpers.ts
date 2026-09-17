/**
 * Validates an email address format
 * @param email - The email string to validate
 * @returns true if the email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculates age from date of birth in DD/MM/YYYY format
 * @param dob - Date of birth string in DD/MM/YYYY format
 * @returns Calculated age as a string, or empty string if invalid format
 */
export const calculateAge = (dob: string): string => {
  if (dob.length !== 10) return '';
  
  const parts = dob.split('/');
  if (parts.length !== 3) return '';
  
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  
  if (!day || !month || !year) return '';
  
  const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const today = new Date();
  
  let calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    calculatedAge--;
  }
  
  return calculatedAge.toString();
};
