// Storage for various utility functions:

// DATE:
// assign 0 in front of single-digit stringified date obj values (month/day), return double-digit as is: e.g. 5 -> 05; 15 -> 15
export const formatSingleDigitDateValue = dateObj => dateObj < 10 ? `0${dateObj}` : `${dateObj}`;

// generate date from passed dateObj (fetched from db) -> to string (yyyy.mm.dd)
export const generateDateString = (date, separator='.') => {
  const dateObj = new Date(date); 
  const year = dateObj.getFullYear();
  let month = formatSingleDigitDateValue(dateObj.getMonth() + 1); 
  let day = formatSingleDigitDateValue(dateObj.getDate());
  return `${year}${separator}${month}${separator}${day}${separator}`;
}

// if date is array: read, transform & simplify img exif date -> convert it to a " input type='date' " compatible string (test: ['2023:05:25 20:55:59'] -> '2023:05:25')
// if date is string: replace separators 
export const transformDate = (date, separatorOriginal=':', separatorReplace='-') => {
  if(!date) {return}
  if(Array.isArray(date)) {
    return date[0].split(' ')[0].replaceAll(separatorOriginal, separatorReplace);
  } else if (typeof date === 'string') { // if input is string type: replace
    let transformedDate = date.replaceAll(separatorOriginal, separatorReplace);
    return `${transformedDate}${separatorReplace}`; // add separator to the end of day (e.g. yyyy.mm.dd -> yyyy.mm.dd.)   
  } else { return }
}

// limit date input year value to 4 digits (20222 -> 2022)
export const formatDateYear = dateValue => {
  const dateArr = dateValue.split('-');
  dateArr[0] = dateArr[0].trim().slice(0, 4);
  return dateArr.join('-');
} 

// STRING MANIPULATION
// crop input string's length above || return original below maxLength.
// cropped string length is cropLength + '...' 
export const cropString = (inputString, maxLength, cropLength) => {
  if (inputString.length <= maxLength) { return inputString }; // max length is not reached
  const cropStartLength = cropLength / 2; // after how many characters should crop start 
  const cropEndLength = cropLength - cropStartLength; // before how many characters should crop end (start couting from inputString's end Length)
  const start = inputString.slice(0, cropStartLength); // extract string before crop
  const end = inputString.slice(inputString.length - cropEndLength); // extract string after crop (from )
  return `${start}...${end}`;
}

// FORM & INPUT
// convert and simplify form data that we can pass to the backend ({key1:value1, ...})  
export const convertFormData = (formData) => {
  let converted = {};
  for(let elem in formData) {
    converted = {...converted, [elem]: formData[elem].value};
  }
  return converted;
}

/* build input fields using fetched form data (name) :
convert form template obj of objs (input fields to render) 
to an array of objs so we can render it using .map
*/
export const buildInputFields = (formData) => {
  let inputFieldsArray = [];
  for(let elem in formData) {
    inputFieldsArray.push({name: elem})
  }
  return inputFieldsArray;
}

// CHARACTER COUNTER
// display basic chracter counter. requires current length and max allowed length
export const characterCounter = (currentLength, maxLength) => {
  !currentLength && !maxLength;
  let trackedLength = currentLength > maxLength ? maxLength : currentLength;
  return `(${trackedLength} / ${maxLength})`;
}  