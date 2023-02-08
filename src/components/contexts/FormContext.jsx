import React, {useState, useEffect, createContext, useContext} from 'react'
import {statusMessages} from '../../helper/dataStorage'
import ExifReader from 'exifreader';
import {transformDate} from '../../helper/dateUtilities'
// DEFINE && EXPORT CONTEXT
// create context
const FormLayoutProvider = createContext();
// export context
export const useFormContext = () => {
  return useContext(FormLayoutProvider);
}
// define layout provider
export default function FormContext({children}) {
  // STATES
  const [formData, setFormData] = useState();
  const [imageFile, setImageFile] = useState(statusMessages.UPLOAD_IMAGE_FILE_INITIAL);
  const [exifExtractedValues, setExifExtractedValues] = useState({}); // extracted values from uploaded(selected) img (date of capture and gps coordinates)
  const [statusMessage, setStatusMessage] = useState(statusMessages.EMPTY);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [data, setData] = useState([]);

  // EFFECT
  // read exif data of the added image file, if exist
  useEffect(() => {
    if(!imageFile) return;
    if(typeof imageFile !== 'object') {return}
    (async () => {
      const tags = await ExifReader.load(imageFile, {expanded: true});
      let extractedData = {};
      if(tags) {
        const dateTimeDigitized = transformDate(tags.exif?.DateTimeDigitized?.value || '');
        if(dateTimeDigitized) {
          extractedData = {...extractedData, dateTimeDigitized: dateTimeDigitized};
        }
        if(tags.gps?.Latitude || tags.gps?.Longitude) {
          extractedData = {...extractedData, gps: [tags.gps.Latitude, tags.gps.Longitude]};
        }
        setExifExtractedValues(extractedData);
      }
    })()
  }, [imageFile, setExifExtractedValues])
  // HANDLERS
  // input fields change handler (input, textarea)
  const inputChangeHandler = (e) => {
    // get event name, value 
    const { name, value } = e.target; // get event name, value 
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm[name]}; // copy and update nested form properties
    console.log(exifExtractedValues.gps);
    updatedItem.value = value; // update prop value
    updatedForm[name] = updatedItem; // update form with updated property
    setFormData(updatedForm);  // update state
  };
  // add image to file api handler  && validate selected image file (check file extension, update state)
  const validateImageFile = (selected) => {
    const types = ['image/png', "image/jpeg"];  // allowed image file types
    if (selected && types.includes(selected.type)) { // file's format is listed in types arr
      setImageFile(selected);
    } else { // if invalid
      setImageFile(statusMessages.UPLOAD_IMAGE_FILE_NOT_SUPPORTED_FORMAT);
      selected = statusMessages.EMPTY;
    } 
  }
  // upload image
  const imageFileChangeHandler = (e) => {
    e.preventDefault();
    // get selected file
    let selectedFile = e.target.files[0] 
    validateImageFile(selectedFile); // validate file, update state
    // update form with image file
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm['imageFile']}; // copy and update nested form properties
    updatedItem.value = selectedFile; // update prop value
    updatedForm['imageFile'] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
  }
  // date input 
  const dateInputChangeHandler = (e) => {
    e.preventDefault();
    setDateTimeDigitized(prev => {
      return {...prev, dateTimeDigitized: e.target.value}
    });
    // update form captureDate field
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm['captureDate']}; // copy and update nested form properties
    updatedItem.value = e.target.value; // update prop value
    updatedForm['captureDate'] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
  }
  
  return (
    <FormLayoutProvider.Provider
      value={{
        formData, setFormData,
        imageFile, setImageFile,
        statusMessage, setStatusMessage,
        isSubmittingForm, setIsSubmittingForm,
        data, setData,
        exifExtractedValues, setExifExtractedValues,
        inputChangeHandler,
        imageFileChangeHandler,
        dateInputChangeHandler
      }}
    > {children}
    </FormLayoutProvider.Provider>
  )
}