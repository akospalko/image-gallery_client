// Input field to handle file (photo) upload, read photo's exif data, update form data   
// Resource: Codemzy blog, https://www.codemzy.com/blog/react-drag-drop-file-upload
import React, {useState, useEffect, useRef} from 'react'
import './FileUpload.css'
import { useFormContext } from '../contexts/FormContext'
import { statusMessages } from '../../helper/dataStorage';
import { transformDate } from '../../helper/dateUtilities';
import ExifReader from 'exifreader';
import { cropString } from '../../helper/cropStringInput';
import Button from '../UI/Button';
import { useModalContext } from '../contexts/ToggleModalContext';
import useHideImagesWhileLoading from '../../components/hooks/useHideImagesWhileLoading'
import Loader from '../SVG/Loader';

export default function FileUpload() {
  // CONSTANTS
  const maxFileSizeInBytes = 10000000; // 10 MB // allowed upload file size 
  const convertBytesToMBConstant = 1000000;
  const types = ['image/png', "image/jpeg"]; // allowed photo file types
  // CONTEXT
  const {
    photoFile, setPhotoFile,
    formData, setFormData,
  } = useFormContext();
  const {activeID} = useModalContext();
  // HOOKS 
  const {    
    allImagesLoaded, setAllImagesLoaded, 
    hideImageStyle, 
    getImageFile,} = useHideImagesWhileLoading();
  // STATE
  const [dragActive, setDragActive] = useState(false);
  const [fileUploadStatus, setFileUploadStatus] = useState({status: 'default', message: statusMessages.FILE_UPLOAD_INITIAL(maxFileSizeInBytes / convertBytesToMBConstant)}); // status -> successful/default state for adding file to the File API
  // REF
  const inputRef = useRef(null); 
  // EFFECT
  // read exif data of the added photo file, if exist
  useEffect(() => {
    if( !photoFile || typeof photoFile !== 'object' || !photoFile.name) return;
    (async () => {
      const tags = await ExifReader.load(photoFile, {expanded: true});
      // extract exif data(GPS coord.s, capture date), update formData
      if(tags) {
        const extractedExif = {
          captureDate: transformDate(tags.exif?.DateTimeDigitized?.value || undefined),
          gpsLatitude: Number(tags.gps?.Latitude) || undefined,
          gpsLongitude: Number(tags.gps?.Longitude) || undefined,
        }
        let updatedForm = {...formData}; // copy form
        for(let entry in extractedExif) {
          if(extractedExif[entry] !== undefined) { // update form if exif data is present 
            const updatedItem = {...updatedForm[entry]}; // copy and update nested form properties
            updatedItem.value = extractedExif[entry]; 
            updatedForm[entry] = updatedItem; // update form with updated property
          }
        }
        setFormData(updatedForm); // update state
      }
    })()
  }, [photoFile, setFormData])
  // 
  useEffect(() => {
    if(photoFile && Object.keys(activeID).length === 0) { return } 
    setAllImagesLoaded(false);
  }, [photoFile, setFormData])

  // FUNCTIONS
  // reusable state setter, used after a browsed/dropped photo is being validated 
  const fileUploadStatusSetter = (status, message) => {
    if(!status || !message || typeof status !== 'string' || typeof status !== 'string') return;
    setFileUploadStatus(prev => {
      prev.status = status;
      prev.message = message; 
      return prev;
    });
  }
  // validate selected file: file extension, size && update state
  const validatePhotoFile = (selected) => {
    if(!selected) return false;
    if (!types.includes(selected.type)) { // check file's extension
      fileUploadStatusSetter('error', statusMessages.FILE_UPLOAD_EXTENSION_ERROR);
      return false;
    }
    if (selected.size > maxFileSizeInBytes) { // check photo max file size
      fileUploadStatusSetter('error', statusMessages.FILE_UPLOAD_MAX_SIZE_ERROR(maxFileSizeInBytes / convertBytesToMBConstant));
      return false;
    }
    // selected file is OK
    setPhotoFile(selected); // store file in state  
    fileUploadStatusSetter('ok', selected.name); // set ok status
    return true;
  }
  // HANDLERS
  // file change listener, browse file -> select -> validate -> store in state
  const browseFileChangeHandler = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0]  
    validatePhotoFile(selectedFile); // validate file
    // update form with photo file
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm['photoFile']}; // copy and update nested form properties
    updatedItem.value = selectedFile; // update prop value
    updatedForm['photoFile'] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
  }
  // triggered while file dragging is active
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  // triggers when file is dropped
  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    let selectedFile = e.dataTransfer.files[0];
    validatePhotoFile(selectedFile); // validate file, update state
    // update form with photo file
    let updatedForm = {...formData}; // copy form
    const updatedItem = {...updatedForm['photoFile']}; // copy and update nested form properties
    updatedItem.value = selectedFile; // update prop value
    updatedForm['photoFile'] = updatedItem; // update form with updated property
    setFormData(updatedForm); // update state
    }
  };
  // triggers the input when the button is clicked
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  // ELEMENTS
  // upload file input field
  const uploadFile = (
    <label 
      className={`file-upload-label ${dragActive ? "file-upload-label--drag-active" : ""}`} 
      onDragEnter={handleDrag}
      onDragLeave={handleDrag} 
      onDragOver={handleDrag} 
      onDrop={handleDrop}
    >
      <input ref={inputRef} type='file' onChange={browseFileChangeHandler} />
      <div className='file-upload-instruction'> 
        <span> Drop Your Photo In the Box <br/> </span> 
        <span>  OR  </span> 
        <Button clicked={onButtonClick} buttonStyle='button-upload-file'> Browse </Button> 
      </div>
      <div className='file-upload-status'>
        <span className={fileUploadStatus.status === "error" ? "file-upload-invalid" : "" } > 
        { fileUploadStatus.status === 'ok' ? cropString(fileUploadStatus.message, 15, 15) : fileUploadStatus.message } 
        </span> 
      </div>
    </label>
  );
  // display file
  const customImgStyle = {objectFit: 'contain'};
  const displayFile = (
    <>
    { !allImagesLoaded && <div className='file-upload-display'>
        <Loader height='50%' width='50%'/> 
      </div> 
    } 
      <div className='file-upload-display' style={hideImageStyle}>
      { photoFile.name ? 
          <img src={URL.createObjectURL(photoFile) || {}} style={{ height: '100%', width: '100%', backgroundColor: 'rgb(59, 59, 59)', ...customImgStyle}} />
          // getImageFile(URL.createObjectURL(photoFile) || {}, customImgStyle) 
          : 
          activeID.photoURL ? 
          getImageFile(activeID.photoURL, customImgStyle, activeID._id) 
          :
          <span> NO IMG </span> 
        }
      </div> 
    </>
  );

  return(
    <div className='file-upload-container'>
      {uploadFile}
      {displayFile}
    </div>
  );
}