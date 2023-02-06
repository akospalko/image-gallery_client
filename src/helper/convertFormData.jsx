// convert and simplify form data that we can pass to the backend ({key1:value1, ...})  
  export const convertFormData = (form) => {
    let converted = {};
    for(let elem in form) {
      converted = {...converted, [elem]: form[elem].value};
    }
    return converted;
  }
