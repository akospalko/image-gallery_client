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