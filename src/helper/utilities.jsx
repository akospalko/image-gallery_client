// Storage for various utility functions:

// DATE:
// generate date from passed dateObj (fetched from db) -> to string (yyyy.mm.dd)
export const generateDateString = (date, separator='.') => {
  const dateObj = new Date(date); 
  const year = dateObj.getFullYear();
  let month = (dateObj.getMonth() + 1) < 10 ? (`0${dateObj.getMonth()}`) : (`${dateObj.getMonth()}`); 
  let day = dateObj.getDate() < 10 ? (`0${dateObj.getDate()}`) : (`${dateObj.getDate()}`);
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

// STRING MANIPULATION
// crop and/or return input string if its length reaches the 'to be cropped' values(cropFront, cropBack) 
export const cropString = (inputString, cropFront = 0, cropBack = 0) => {
  if(cropFront === 0 || !cropFront === 0) return inputString;
  return inputString <= (cropFront + cropBack) ? inputString : `${inputString.slice(0, cropFront)}...${inputString.slice(inputString.length - cropBack)}`;  
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