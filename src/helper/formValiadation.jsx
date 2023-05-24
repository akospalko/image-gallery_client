import { formatSingleDigitDateValue, characterCounter } from './utilities';
import { INPUT_VALIDATION_MESSAGES } from './statusMessages';
import { CONSTANT_VALUES } from './constantValues';

// TODO:
// + reset validationMessages on modal close / submit || empty validation messages on unmount
// + add form Touched state to form context?
// + connect validation result with submit button disable status
// + compare password + password confirm when registering user
// basic input validator, returns valiation msg
// check for: username, (confirm)password, email, gps coordinates, title, description, author 
export const basicInputFieldValidator = (name, value='', required, minLength, maxLength, fieldName) => {
  if(!name || !value) return;
  // CONSTANTS
  let validationMessage = ''; 
  // check if value's length has reached min/max
  const lengthReached = (lengthValue, lengthMinOrMax) => lengthValue > lengthMinOrMax; 
  const isMinLengthReached = minLength ? lengthReached(value.length, minLength) : false;
  // const isMaxLengthReached = maxLength ? lengthReached(value.length, maxLength) : false;
  
  // VALIDATION
  // USERNAME
  // check register username field   
  if(name === 'username' && fieldName==='usernameRegister') { 
    // check for length 
    validationMessage = !isMinLengthReached ? INPUT_VALIDATION_MESSAGES.MIN_LENGTH(minLength) : validationMessage;
    // check invalid characters
    validationMessage = !new RegExp(/^[a-zA-Z0-9_.]+$/).test(value) ? INPUT_VALIDATION_MESSAGES.USERNAME : validationMessage; 
  } 
  // PASSWORD
  // check password validity
  else if((name === 'password' || name === 'passwordConfirm') && (fieldName==='passwordRegister' || fieldName==='passwordConfirmRegister')) {
    validationMessage = minLength && !new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{${minLength},}$`).test(value) ? 
    INPUT_VALIDATION_MESSAGES.PASSWORD_REGISTER(minLength) : '';
  } 
  // EMAIL
  else if (name === 'email') {
    if(!new RegExp(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/).test(value)) {
      validationMessage = INPUT_VALIDATION_MESSAGES.EMAIL;
    }
  }
  // GPS LAT
  else if(name === 'gpsLatitude') { 
    validationMessage = !new RegExp(/^-?([0-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/).test(value) && INPUT_VALIDATION_MESSAGES.COORDINATE_LAT;
  }
  // GPS LON
  else if(name === 'gpsLongitude') { 
    validationMessage = !new RegExp(/^-?((([0-9]|[1-9][0-9]|1[0-7][0-9])(\.[0-9]+)?)|180(\.0+)?)$/).test(value) && INPUT_VALIDATION_MESSAGES.COORDINATE_LON;
  }  
  // MISC
  // check string min/max length  
  else if (name === 'description') {
    validationMessage = characterCounter(value.length, maxLength);
    console.log(validationMessage);
  } 
  // MISC
  // check string min/max length  
  else if (name === 'title' || name === 'author') {
    const isMinLengthEqualOrReached = minLength ? lengthReached(value.length + 1, minLength) : false;
    validationMessage = !isMinLengthEqualOrReached ? INPUT_VALIDATION_MESSAGES.MIN_LENGTH(minLength) : characterCounter(value.length, maxLength);
  } 

  // CHECK IF REQUIRED FIELD IS EMPTY
  if(required && (!value || value.trim() === '')) {
    validationMessage = INPUT_VALIDATION_MESSAGES.REQUIRED;
  } 
  return validationMessage;
}

// DATE INPUT
// TODO: invalid input is considered empty on submit (-> valid or no date)
export const dateValidator = (dateInputString) => {
  // check for invalid date input string
  if(isNaN(Date.parse(dateInputString))) return INPUT_VALIDATION_MESSAGES.INVALID_DATE;
  // CONSTANTS
  let validationMessage = '';
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
    validationMessage = inputYear > currentYear || inputYear < CONSTANT_VALUES.earliestYear ? INPUT_VALIDATION_MESSAGES.ALLOWED_YEAR_RANGE(CONSTANT_VALUES.earliestYear, currentYear) : validationMessage;
    // limit input month not to exceed current month. Triggers if input + current years are equal
    validationMessage = inputYear === currentYear && inputMonth > currentMonth ? INPUT_VALIDATION_MESSAGES.EXCEEDED_MONTH(formatSingleDigitDateValue(currentMonth)) : validationMessage ;
    // limit input day not to exceed current day. Triggers if input + current years and months are equal 
    validationMessage = inputYear === currentYear && inputMonth === currentMonth && inputDay > currentDay ? INPUT_VALIDATION_MESSAGES.EXCEEDED_DAY(formatSingleDigitDateValue(currentDay)) : validationMessage;
  } else {
    validationMessage = INPUT_VALIDATION_MESSAGES.INVALID_DATE;
  }
  return validationMessage;
}

// FILE INPUT (photo): validate input file, return appropriate status & message
export const photoFileValidator = (selectedFile) => {
  if(!selectedFile) { return; }
  // CONSTANTS
  const maxFileSizeInBytes = CONSTANT_VALUES.MAX_FILE_SIZE_IN_BYTES; 
  const convertBytesToMBConstant = CONSTANT_VALUES.CONVERT_BYTES_TO_MB_CONSTANT;
  const fileUploadExtensionErrorStatusMessage = INPUT_VALIDATION_MESSAGES.FILE_UPLOAD_EXTENSION_ERROR; 
  const fileUploadMaxSizeErrorStatusMessage = INPUT_VALIDATION_MESSAGES.FILE_UPLOAD_MAX_SIZE_ERROR(maxFileSizeInBytes / convertBytesToMBConstant)
  // validate selected file: check file extension, size
  if (!CONSTANT_VALUES.ALLOWED_FILE_TYPES.includes(selectedFile.type)) { // check file extension
    return { status: 'error', message: fileUploadExtensionErrorStatusMessage };
  } if (selectedFile.size > maxFileSizeInBytes) { // check photo max file size
    return { status: 'error', message: fileUploadMaxSizeErrorStatusMessage };
  } 
  return { status: 'ok', message: selectedFile.name };
}