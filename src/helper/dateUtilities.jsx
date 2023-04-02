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