// a component to create reusable input forms 
import React, {useContext} from 'react'
// import React, {useState} from 'react'
import './ImageUpload.css'
import {FormContext} from '../UI/Form';

export default function ImageUpload () {
  const {imageFileChangeHandler, imageFile} = useContext(FormContext);

  return(
    <div className='image-upload-file-container'>
      <label className='image-upload-file-input'>
          {/* file input */}
        <div className='image-upload-input-field'>
          <input
            type="file"
            value='' // resets value // solves the problem when we couldn't choose the same picture twice in a row for upload. 
            onChange={(e) => imageFileChangeHandler(e)}
          />
          <span > Select </span>
        </div>
      </label>
      <p className='image-upload-message'> 
        {imageFile?.name || imageFile} 
      </p>
    </div>
  );
}