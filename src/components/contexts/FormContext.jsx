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
  const [photoFile, setPhotoFile] = useState(statusMessages.UPLOAD_PHOTO_FILE_INITIAL);
  const [exifExtractedValues, setExifExtractedValues] = useState({}); // extracted values from uploaded(selected) img (date of capture and gps coordinates)
  const [statusMessage, setStatusMessage] = useState(statusMessages.EMPTY);
  const [data, setData] = useState([]);
  const [homePhotos, setHomePhotos] = useState([]);
  const [message, setMessage] = useState('');

  // EFFECT
  // read exif data of the added photo file, if exist
useEffect(() => {
    if(!photoFile) return;
    if(typeof photoFile !== 'object') {return}
    (async () => {
      const tags = await ExifReader.load(photoFile, {expanded: true});
      //update formData with the fetched gps data
      if(tags) {
        const captureDate = transformDate(tags.exif?.DateTimeDigitized?.value || '');
        const gpsLatitude = Number(tags.gps?.Latitude) || undefined;
        const gpsLongitude = Number(tags.gps?.Longitude) || undefined;
        const extractedData = {captureDate, gpsLatitude, gpsLongitude };

        let updatedForm = {...formData}; // copy form
        for(let entry in extractedData) {
          const updatedItem = {...updatedForm[entry]}; // copy and update nested form properties
          updatedItem.value = extractedData[entry]; 
          updatedForm[entry] = updatedItem; // update form with updated property
        }
        setFormData(updatedForm); // update state
        setExifExtractedValues(extractedData);
      }
    })()
  }, [photoFile, setFormData, setExifExtractedValues])
  // HANDLERS
  // input fields change handler (input, textarea)
  const inputChangeHandler = (e) => {
    // get event name, value 
    const { name, value } = e.target; // get event name, value 
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm[name]}; // copy and update nested form properties
    updatedItem.value = value; // update prop value
    updatedForm[name] = updatedItem; // update form with updated property
    setFormData(updatedForm);  // update state
  };
  // add photo to file api handler  && validate selected photo file (check file extension, update state)
  const validatePhotoFile = (selected) => {
    const types = ['image/png', "image/jpeg"];  // allowed photo file types
    if (selected && types.includes(selected.type)) { // file's format is listed in types arr
      setPhotoFile(selected);
    } else { // if invalid
      setPhotoFile(statusMessages.UPLOAD_PHOTO_FILE_NOT_SUPPORTED_FORMAT);
      selected = statusMessages.EMPTY;
    } 
  }
  // upload photo
  const photoFileChangeHandler = (e) => {
    e.preventDefault();
    // get selected file
    let selectedFile = e.target.files[0] 
    validatePhotoFile(selectedFile); // validate file, update state
    // update form with photo file
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm['photoFile']}; // copy and update nested form properties
    updatedItem.value = selectedFile; // update prop value
    updatedForm['photoFile'] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
  }
  // date input 
  const dateInputChangeHandler = (e) => {
    e.preventDefault();
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
        photoFile, setPhotoFile,
        statusMessage, setStatusMessage,
        data, setData,
        homePhotos, setHomePhotos,
        message, setMessage,
        exifExtractedValues, setExifExtractedValues,
        inputChangeHandler,
        photoFileChangeHandler,
        dateInputChangeHandler
      }}
    > {children}
    </FormLayoutProvider.Provider>
  )
}