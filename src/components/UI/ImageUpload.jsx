// a component to create reusable input forms 
import React, {useEffect, useState} from 'react'
import './ImageUpload.css'

export default function ImageUpload () {
  const [imageFile, setImageFile] = useState('')

  useEffect(() => {
    console.log(imageFile)
  }, [imageFile])

  const validateImageFile = (selected) => {
    console.log(selected)
    const types = ['image/png', "image/jpeg"];  // allowed image file types
    if (selected && types.includes(selected.type)) { // file's format is listed in types arr
      setImageFile(selected);
    } else { // if invalid
      setImageFile('Not supported file format');
      selected = '';
    } 
  }

  //upload image
  const uploadImageFileHandler = (e) => {
    e.preventDefault();
    let selected = e.target.files[0] // get selected file
    validateImageFile(selected); // validate file, update state
    // TODO: update form with image file
  }

  return(
    <>
      <label className='image-upload-file-input'>
          {/* file input */}
        <div className='image-upload-input-field'>
          <input
            type="file"
            value='' // resets value // solves the problem when we couldn't choose the same picture twice in a row for upload. 
            onChange={(e) => uploadImageFileHandler(e)}
          />
          <span > Select Image (png/jpg) </span>
        </div>
          
        <div className='image-upload-message'> 
          <p> {imageFile?.name || imageFile } </p>
        </div>
      </label>
    </>
  );
}