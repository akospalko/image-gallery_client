// Utility file to store different predefind status messages   
// input field validation messages
export const INPUT_VALIDATION_MESSAGES = {
  // basic input
  REQUIRED : 'Required field', 
  MIN_LENGTH : minLength => minLength && `Min. ${minLength} characters`,
  MAX_LENGTH : maxLength => maxLength && `Max. ${maxLength} characters`,
  COORDINATE_LAT : 'Values between -90 and 90',
  COORDINATE_LON : 'Values between -180 and 180',
  USERNAME : "Allowed characters: a-z A-Z 0-9 _ . ",
  PASSWORD_REGISTER : minLength => minLength && `Min. ${minLength} characters. Contains: A-Z, a-z, 0-9, special characters`,
  EMAIL : 'Wrong email format',
  // date input 
  ALLOWED_YEAR_RANGE: (earliestYear, currentYear) => `Input year range must be between ${earliestYear} and ${currentYear} `, 
  EXCEEDED_MONTH: currentMonth => `Input month must not exceed current month (${currentMonth}.) `,
  EXCEEDED_DAY: currentDay => `Input day must not exceed today (${currentDay}.) `,
  INVALID_DATE: 'Invalid date',
} 
 