import { formatSingleDigitDateValue } from './utilities';

// form and input field validation
// validation messages:
const REQUIRED = 'Required field';
const MIN_LENGTH = minLength => minLength && `Min. ${minLength} characters`;
const MAX_LENGTH = maxLength => maxLength && `Max. ${maxLength} characters`;
const COORDINATE_LAT = 'Values between -90 and 90';
const COORDINATE_LON = 'Values between -180 and 180';
const USERNAME = "Allowed characters: a-z A-Z 0-9 _ . "
const PASSWORD_REGISTER = minLength => minLength && `Min. ${minLength} characters. Contains: A-Z, a-z, 0-9, special characters`;
const EMAIL = 'Wrong email format'

// TODOs
// TODO: add reusable character counter
// add form Touched state to form context?
// + date & file validation  
// + outsource & merge validation field messages in a shared file
// + compare password + password confirm when registering user
// + empty validation messages on unmount
// + required field show up from the beginning
// delete pw field content if login was unsuccessfull
/* + fields to validate: 
types: string, number, date, file
 , passwordConfirm ,
string:  

title, author, description - same length, different max - min 
 
*/
// + login: don't check for correct password format, register: check for correct pw format 
export const validateInputField = (name, value='', required, minLength, maxLength, fieldName) => {
  // if(!name || !value) return;
  console.log(name, required, minLength, maxLength);

  // returned validation message
  let validationMessage = '';
  // check if value's length has reached min/max
  const lengthReached = (lengthValue, lengthMinOrMax) => lengthValue > lengthMinOrMax; 
  const isMinLengthReached = minLength ? lengthReached(value.length, minLength) : false;
  const isMaxLengthReached = maxLength ? lengthReached(value.length, maxLength) : false;
  // VALIDATION
  // USERNAME
  // check register username field   
  if(name === 'username' && fieldName==='usernameRegister') { 
    // check for length 
    validationMessage = !isMinLengthReached ? MIN_LENGTH(minLength) : isMaxLengthReached ? MAX_LENGTH(maxLength) : validationMessage;
    // check invalid characters
    validationMessage = !new RegExp(/^[a-zA-Z0-9_.]+$/).test(value) ? USERNAME : validationMessage; 
  } 
  // PASSWORD
  // check password validity
  else if((name === 'password' || name === 'passwordConfirm') && (fieldName==='passwordRegister' || fieldName==='passwordConfirmRegister')) {
    validationMessage = minLength && !new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{${minLength},}$`).test(value) ? 
    PASSWORD_REGISTER(minLength) : '';
  } 
  // EMAIL
  else if (name === 'email') {
    if(!new RegExp(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/).test(value)) {
      validationMessage = EMAIL;
    }
  }
  // GPS LAT
  else if(name === 'gpsLatitude') { 
    validationMessage = !new RegExp(/^-?([0-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/).test(value) && COORDINATE_LAT;
  }
  // GPS LON
  else if(name === 'gpsLongitude') { 
    validationMessage = !new RegExp(/^-?((([0-9]|[1-9][0-9]|1[0-7][0-9])(\.[0-9]+)?)|180(\.0+)?)$/).test(value) && COORDINATE_LON;
  }  
  // MISC
  // check string min/max length  
  else if (name === 'description') {
    // TODO: add character counter
    const characterCounter = (currentLength, maxLength) => {
      return `(${currentLength} / ${maxLength})`;
    }  
    validationMessage = isMaxLengthReached ? MAX_LENGTH(maxLength) : characterCounter(value.length, maxLength);
    // console.log(MAX_LENGTH(maxLength));
    console.log(validationMessage);
  } 
  // MISC
  // check string min/max length  
  else if (name === 'title' || name === 'author') {
    validationMessage = !isMinLengthReached ? MIN_LENGTH(minLength) : isMaxLengthReached ? MAX_LENGTH(maxLength) : validationMessage;
  } 

  // CHECK IF REQUIRED FIELD IS EMPTY
  if(required && (!value || value.trim() === '')) {
    validationMessage = REQUIRED;
  } 
  return validationMessage;
}

// DATE
// DATE INPUT IS NOT required -> we must warn user to formulate date proerly but also let them submit without any value/ touched formula 
// if user touched/passed wrong data we let them submit form but we don't consider the invalid input -> we pass an empty '' instead 
export const dateValidation = (dateInputString) => {
  // check for invalid date input string
  if(isNaN(Date.parse(dateInputString))) return INVALID_DATE;
  let validationMessage = '';
  // MESSAGES
  const ALLOWED_YEAR_RANGE = (earliestYear, currentYear) => `Input year range must be between ${earliestYear} and ${currentYear} `; 
  const EXCEEDED_MONTH = currentMonth => `Input month must not exceed current month (${currentMonth}.) `;
  const EXCEEDED_DAY = currentDay => `Input day must not exceed today (${currentDay}.) `;
  const INVALID_DATE = 'Invalid date';
  const earliestYear = 1900; 
  // VALUES
  // input date
  const inputDate = new Date(dateInputString);
  const inputDay = inputDate.getDate();
  const inputMonth = inputDate.getMonth() + 1;
  const inputYear = inputDate.getFullYear();
  // current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  // FUNCTIONALITIES
  // check if input is real date
  const isDateValid = date => date instanceof Date && !isNaN(date);
  // VALIDATION
  if(isDateValid(inputDate)) {
    // force input year between current year and earliest year values
    validationMessage = inputYear > currentYear || inputYear < earliestYear ? ALLOWED_YEAR_RANGE(earliestYear, currentYear) : validationMessage;
    // limit input month not to exceed current month. Triggers if input + current years are equal
    validationMessage = inputYear === currentYear && inputMonth > currentMonth ? EXCEEDED_MONTH(formatSingleDigitDateValue(currentMonth)) : validationMessage ;
    // limit input day not to exceed current day. Triggers if input + current years and months are equal 
    validationMessage = inputYear === currentYear && inputMonth === currentMonth && inputDay > currentDay ? EXCEEDED_DAY(formatSingleDigitDateValue(currentDay)) : validationMessage;
  } else {
    validationMessage = INVALID_DATE;
  }
  return validationMessage;
}