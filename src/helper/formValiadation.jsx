// form and input field validation
// validation messages:
const REQUIRED = 'Required field';
const MIN_LENGTH = minLength => `Min. ${minLength} characters`;
const MAX_LENGTH = maxLength => `Max. ${maxLength} characters`;
const COORDINATE_LAT = 'Values between -90 and 90';
const COORDINATE_LON = 'Values between -180 and 180';
const USERNAME = "Allowed characters: a-z A-Z 0-9, _ ."
const PASSWORD_REGISTER = minLength => `Min. ${minLength} characters. Contains: A-Z, a-z, 0-9, special characters`
const EMAIL = 'Wrong email format'
// check if value has reached min/max length
const minLengthReached = (length, minLength) => minLength && length < minLength;
const maxLengthReached = (length, maxLength) => maxLength && length > maxLength;

// TODOs
// add form Touched state to form context?
// + date & file validation  
// + compare password + password confirm when registering user
// + proper messages
// + empty validation messages on unmount
// + required field show up from the beginning
// delete pw field content if login was unsuccessfull
/* + fields to validate: 
types: string, number, date, file
 , passwordConfirm ,
string:  

username, password, pwConfirm, title, author, description - same length, different max - min 
 
*/
// + login: don't check for correct password format, register: check for correct pw format 
export const validateInputField = (name, value='', required, minLength, maxLength) => {
  // if(!name || !value) return;
  console.log(name, required, minLength, maxLength);
  console.log(value);
  let errorMessage = '';
  
  // Check string min/max length  
  if (name === 'title' || name === 'author' || name === 'description' || name === 'username') {
    minLengthReached(value.length, minLength) ? errorMessage = MIN_LENGTH(minLength) : null;
    maxLengthReached(value.length, maxLength) ? errorMessage = MAX_LENGTH(maxLength) : null;
  }  
  // USERNAME
  if(name === 'username') { 
    // TODO: login should not check for max - min length only for required data 
    if(!new RegExp(/^[a-zA-Z0-9_.]/).test(value)) { 
      errorMessage = USERNAME; 
    }
  } 
  // PASSWORD
  else if(name === 'password' || name === 'passwordConfirm') {
    if(minLength && !new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{${minLength},}$`).test(value)) {
      errorMessage = PASSWORD_REGISTER(minLength);
    }
  } 
  // EMAIL
  else if (name === 'email') {
    if(!new RegExp(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/).test(value)) {
      errorMessage = EMAIL;
    }
  }
  // GPS LAT
  else if(name === 'gpsLatitude') { 
    errorMessage = !new RegExp(/^-?([0-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/).test(value) && COORDINATE_LAT;
  }
  // GPS LON
  else if(name === 'gpsLongitude') { 
    errorMessage = !new RegExp(/^-?((([0-9]|[1-9][0-9]|1[0-7][0-9])(\.[0-9]+)?)|180(\.0+)?)$/).test(value) && COORDINATE_LON;
  }
  // REQUIRED / EMPTY
  if(required && (!value || value.trim() === '')) {
    errorMessage = REQUIRED;
  }

  return errorMessage;
}
// } else if(!checkStringLength(trimmedValue.length, 4, 25)) { // length restrictions
// } else if(!new RegExp(/^[a-zA-Z0-9_.]/).test(trimmedValue)) { return 'unusable characters'; }
  
// check validity:
// 1. if a condition returns true: we dont assign mssg / empty mssg
// 2. if a condition returns false: assign new mssg
// 3. check if there are any message:
// 3.1. if all mssg-s are empty -> enable button  
// 3.1. if message is present -> disable button, show error
// 4. check content on submit