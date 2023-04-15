// crop and/or return input string if its length reaches the 'to be cropped' values(cropFront, cropBack) 
export const cropString = (inputString, cropFront = 0, cropBack = 0) => {
  if(cropFront === 0 || !cropFront === 0) return inputString;
  return inputString <= (cropFront + cropBack) ? inputString : `${inputString.slice(0, cropFront)}...${inputString.slice(inputString.length - cropBack)}`;  
}