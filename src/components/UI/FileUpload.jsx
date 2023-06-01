// Input field to handle file (photo) upload, read photo's exif data, update form data
// Resource: Codemzy blog, https://www.codemzy.com/blog/react-drag-drop-file-upload
import React, { useState, useEffect, useRef } from 'react';
import ExifReader from 'exifreader';
import './Input.css';
import './FileUpload.css';
import { INPUT_VALIDATION_MESSAGES } from '../../helper/statusMessages';
import { photoFileValidator } from '../../helper/formValiadation'
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { transformDate, cropString } from '../../helper/utilities';
import useHideImagesWhileLoading from '../../components/hooks/useHideImagesWhileLoading';
import Button from '../UI/Button';
import LoaderIcon from '../SVG/Loader';
import { Delete } from '../SVG/Icons';
import { useModalContext } from '../contexts/ToggleModalContext';
import { useFormContext } from '../contexts/FormContext';

export default function FileUpload() {
  // CONSTANTS
  const defaultValidationState = { status: 'default', message: INPUT_VALIDATION_MESSAGES.FILE_UPLOAD_INITIAL(CONSTANT_VALUES.MAX_FILE_SIZE_IN_BYTES / CONSTANT_VALUES.CONVERT_BYTES_TO_MB_CONSTANT) }; // upload file default status message};
  // CONTEXT
  const {
    photoFile, setPhotoFile,
    formData, setFormData,
    setValidationMessages
  } = useFormContext();
  const {activePhotoEntry} = useModalContext();
  // HOOKS
  const {
    allImagesLoaded, setAllImagesLoaded,
    hideImageStyle,
    getImageFile } = useHideImagesWhileLoading();
  // STATE
  const [dragActive, setDragActive] = useState(false);
  const [fileUploadStatus, setFileUploadStatus] = useState(defaultValidationState); // status -> successful/default state for adding file to the File API
  // REF
  const inputRef = useRef(null);
  // EFFECT
  // extract available exif, update form
  useEffect(() => {
    if(!photoFile?.name) return;
    (async () => {
      const tags = await ExifReader.load(photoFile, {expanded: true});
      // read & extract exif data(GPS coord.s, capture date), update formData
      if(!tags) return;
      const extractedExif = {
        captureDate: transformDate(tags.exif?.DateTimeDigitized?.value || undefined),
        gpsLatitude: Number(tags.gps?.Latitude) || undefined,
        gpsLongitude: Number(tags.gps?.Longitude) || undefined,
      }
      // update form with extracted values
      const updatedForm = {...formData};
      for(let entry in extractedExif) {
        if(extractedExif[entry] !== undefined) { // update form if exif data is present
          const updatedItem = {...updatedForm[entry]};
          updatedItem.value = extractedExif[entry];
          updatedForm[entry] = updatedItem;
        }
      }
      setFormData(updatedForm); // update state
    })()
  }, [])
  // enable loader while fetched photo entry img (!only during update) is being loaded
  useEffect(() => {
    if(photoFile && Object.keys(activePhotoEntry).length === 0) return;
    setAllImagesLoaded(false);
  }, [photoFile, setAllImagesLoaded])
  // HANDLERS
  // check if file is selected, validate file & store in state 
  const selectFileHandler = (selectedFile) => {
    if(selectedFile) {
      const validationResult = photoFileValidator(selectedFile, photoFile);
      setFileUploadStatus(validationResult); // update validation status
      validationResult?.status === 'success' && setPhotoFile(selectedFile); // store file in state
      setValidationMessages(prev => ({...prev, photoFile: {...prev['photoFile'], status: true} }))
    }
  }
  // file change listener: browse & select file -> validate -> store in state
  const browseFileChangeHandler = (e) => {
    e.preventDefault();
    selectFileHandler(e.target.files[0]); // handle file selection, validate, update state 
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
    selectFileHandler(e.dataTransfer.files[0]);  // handle file selection, validate, update state 
  };
  // triggers the input when the button is clicked
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  // remove photo (create photo entry) || restore curent photo (update photo entry photoURL)
  const removePhotoHandler = (e) => {
    e.preventDefault();
    setPhotoFile({});
    inputRef.current && (inputRef.current.value = '');
    setFileUploadStatus(defaultValidationState); // remove status (file name)
  }
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
        <span className={fileUploadStatus?.status === "success" ? "" : fileUploadStatus?.status === "error" ? "file-upload-invalid label-with-required-marker label-with-required-marker--inverted-color" : "label-with-required-marker" } >
          { fileUploadStatus?.status === 'success' ? cropString(fileUploadStatus?.message, 25, 18) : fileUploadStatus?.message }
        </span>
      </div>
    </label>
  );
  // display file
  const customImgStyle = {objectFit: 'contain'};
  const displayFile = (
    <>
      {/* Loader */}
      { !allImagesLoaded &&
        <div className='file-upload-display'>
          <LoaderIcon height='100px' width='100px' stroke='var(--text-color--high-emphasis)'/>
        </div>
      }
      {/* Displayed photo */}
      { (photoFile?.name || activePhotoEntry?.photoURL) &&
        <div className='file-upload-display' style={hideImageStyle}>
          {/* Button wrapper */}
          <div className='file-upload-button-wrapper'>
            <Button
              title='remove photo'
              clicked={removePhotoHandler}
              buttonStyle='button-modal-close'
              disabled={!photoFile.name}
            > <Delete height='100%' width='100%' stroke='var(--bg-color--accent)'/> </Button>
          </div>
          { photoFile.name ?
            <img src={URL.createObjectURL(photoFile) || {}} style={{ height: '100%', width: '100%', ...customImgStyle}} />
            : activePhotoEntry.photoURL ?
            getImageFile(activePhotoEntry.photoURL, customImgStyle, activePhotoEntry._id)
            :
            <span> NO IMG </span>
          }
        </div>
      }
    </>
  );

  return(
    <div className='file-upload-container'>
      {uploadFile}
      {displayFile}
    </div>
  );
}