import { formatSingleDigitDateValue, characterCounter } from './utilities';
import { INPUT_VALIDATION_MESSAGES } from './statusMessages';
import { CONSTANT_VALUES } from './constantValues';
// TODO:
// + add form Touched state to form context?
// + connect validation result with submit button disable status
// compare passwords, return match result 
export const isPasswordMatching = (password, confirmPassword) => {
  return (password && confirmPassword) && password === confirmPassword ? true : false;
}
// check for: username, (confirm)password, email, gps coordinates, title, description, author 
export const basicInputFieldValidator = (name, value='', required, minLength, maxLength, fieldName) => {
  if(!name || !value) { return { status: false, message: '', touched: true } };
  // CONSTANTS
  // check if value's length has reached min/max
  const lengthReached = (lengthValue, lengthMinOrMax) => lengthValue > lengthMinOrMax; 
  const isMinLengthReached = minLength ? lengthReached(value.length + 1, minLength) : false;
  // VALIDATION
  // USERNAME
  // check register username field   
  if(name === 'username' && fieldName==='usernameRegister') { 
    // check invalid characters
    if (!new RegExp(/^[a-zA-Z0-9_.]+$/).test(value)) {
      const usernameInvalidCharacters = INPUT_VALIDATION_MESSAGES.USERNAME;
      return { status: false, message: usernameInvalidCharacters, touched: true };
    }
    // check for length 
    if(!isMinLengthReached) {
      const minLengthError = INPUT_VALIDATION_MESSAGES.MIN_LENGTH(minLength);
      return { status: false, message: minLengthError, touched: true };
    } 
  } 
  // PASSWORD
  else if(name === 'password' || name === 'passwordConfirm') {
    if((name === 'password' && fieldName ==='passwordRegister') || (name === 'password' && fieldName ==='passwordReset')) {
      if(minLength && !new RegExp(`^(?=.*[A-ZÀ-ÖØ-Ý])(?=.*[a-zà-öø-ý])(?=.*[0-9]).*.{${minLength},}$`).test(value)) {
        const invalidPassword = INPUT_VALIDATION_MESSAGES.PASSWORD_REGISTER(minLength);
        return { status: false, message: invalidPassword, touched: true };
      }
    } 
  } 
  // EMAIL
  else if (name === 'email') {
    if(!new RegExp(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/).test(value)) {
      const emailError = INPUT_VALIDATION_MESSAGES.EMAIL;
      return { status: false, message: emailError, touched: true };
    }
  }
  // GPS LAT
  else if(name === 'gpsLatitude') { 
    if(!new RegExp(/^-?([0-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/).test(value)) {
      const gpsLatCoordinateError = INPUT_VALIDATION_MESSAGES.COORDINATE_LAT;
      return { status: false, message: gpsLatCoordinateError, touched: true };
    }
  }
  // GPS LON
  else if(name === 'gpsLongitude') { 
    if(!new RegExp(/^-?((([0-9]|[1-9][0-9]|1[0-7][0-9])(\.[0-9]+)?)|180(\.0+)?)$/).test(value)) {
      const gpsLongCoordinateError = INPUT_VALIDATION_MESSAGES.COORDINATE_LON;
      return { status: false, message: gpsLongCoordinateError, touched: true };
    }
  }  
  // MISC
  //
  else if (name === 'description') {
    return { status: true, message: characterCounter(value.length, maxLength), touched: true };  
  } 
  // check string min/max length  
  else if (name === 'title' || name === 'author') {
    const isMinLengthEqualOrReached = minLength ? lengthReached(value.length + 1, minLength) : false;
    if (!isMinLengthEqualOrReached) {
      const minLengthError = INPUT_VALIDATION_MESSAGES.MIN_LENGTH(minLength);
      return { status: false, message: minLengthError, touched: true };
    } else {
      return { status: true, message: characterCounter(value.length, maxLength), touched: true };
    }
  } 
  // CHECK IF REQUIRED FIELD IS EMPTY
  if(required && (!value || value.trim() === '')) {
    const isRequired = INPUT_VALIDATION_MESSAGES.REQUIRED;
    return { status: false, message: isRequired, touched: true };
  } 
  return { status: true, message: '', touched: true };
}
// DATE INPUT
// TODO: invalid input is considered empty on submit (-> valid or no date)
export const dateValidator = (dateInputString) => {
  // check for invalid date input string
  const invalidDate = INPUT_VALIDATION_MESSAGES.INVALID_DATE;
  if(isNaN(Date.parse(dateInputString))) {
    return { status: false, message: invalidDate, touched: true };    
  }
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
    if(inputYear > currentYear || inputYear < CONSTANT_VALUES.earliestYear) {
      const yearRangeError = INPUT_VALIDATION_MESSAGES.ALLOWED_YEAR_RANGE(CONSTANT_VALUES.earliestYear, currentYear);
      return { status: false, message: yearRangeError, touched: true };   
    }
    // limit input month not to exceed current month. Triggers if input + current years are equal
    if(inputYear === currentYear && inputMonth > currentMonth) {
      const monthRangeError = INPUT_VALIDATION_MESSAGES.EXCEEDED_MONTH(formatSingleDigitDateValue(currentMonth));
      return { status: false, message: monthRangeError, touched: true };   
    }
    // limit input day not to exceed current day. Triggers if input + current years and months are equal 
    if(inputYear === currentYear && inputMonth === currentMonth && inputDay > currentDay) {
      const dayRangeError = INPUT_VALIDATION_MESSAGES.EXCEEDED_DAY(formatSingleDigitDateValue(currentDay));
      return { status: false, message: dayRangeError, touched: true };   
    }
  } else {
    return { status: false, message: invalidDate, touched: true };  
  }
  return { status: true, message: '', touched: true };  
}

// FILE INPUT (photo): validate input file, return appropriate status & message
export const photoFileValidator = (selectedFile, photoFile) => {
  if(!selectedFile) { return { status: 'success', message: photoFile.name} }
  const maxFileSizeInBytes = CONSTANT_VALUES.MAX_FILE_SIZE_IN_BYTES; 
  const convertBytesToMBConstant = CONSTANT_VALUES.CONVERT_BYTES_TO_MB_CONSTANT;
  const allowedFileTypes = CONSTANT_VALUES.ALLOWED_FILE_TYPES;
  // checking for different conditions
  if (!allowedFileTypes.includes(selectedFile.type)) { // check file extension
    const fileUploadExtensionErrorStatusMessage = INPUT_VALIDATION_MESSAGES.FILE_UPLOAD_EXTENSION_ERROR; 
    return { status: 'error', message: fileUploadExtensionErrorStatusMessage };
  } if (selectedFile.size > maxFileSizeInBytes) { // check photo max file size
    const fileUploadMaxSizeErrorStatusMessage = INPUT_VALIDATION_MESSAGES.FILE_UPLOAD_MAX_SIZE_ERROR(maxFileSizeInBytes / convertBytesToMBConstant)
    return { status: 'error', message: fileUploadMaxSizeErrorStatusMessage };
  } 
  return { status: 'success', message: selectedFile.name };
}