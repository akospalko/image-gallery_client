  // transform date fetched from db
  export const transformDate = (data) => {
    const dateObj = new Date(data); 
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    if(month < 10) {
      month = `0${month}`;
    }
    let day = dateObj.getDate();
    if(day < 10) {
      day = `0${day}`;
    }
    return `${year}.${month}.${day}.`;
  }