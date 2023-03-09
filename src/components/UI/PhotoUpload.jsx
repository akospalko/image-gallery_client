// a component to create reusable input forms 
import React from 'react'
import './PhotoUpload.css'
import {useFormContext} from '../contexts/FormContext'

export default function PhotoUpload() {
  // CONTEXT
  const {photoFileChangeHandler, photoFile} = useFormContext();

  return(
    <div className='image-upload-file-container'>
      <label className='image-upload-file-input'>
          {/* file input */}
        <div className='image-upload-input-field'>
          <input
            type='file'
            value='' // resets value // solves the problem when we couldn't choose the same picture twice in a row for upload. 
            onChange={(e) => photoFileChangeHandler(e)}
          />
          <span> Select </span>
        </div>
      </label>
      <p className='image-upload-message'> 
        {photoFile?.name || photoFile} 
      </p>
    </div>
  );
}