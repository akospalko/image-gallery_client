// convert and simplify form data that we can pass to the backend ({key1:value1, ...})  
  export const convertFormData = (formData) => {
    let converted = {};
    for(let elem in formData) {
      converted = {...converted, [elem]: formData[elem].value};
    }
    return converted;
  }
