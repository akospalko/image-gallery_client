// custom date input with date picking option
import React from 'react'
import './DatePicker.css'
import { useFormContext } from '../contexts/FormContext' 

export default function DatePicker() {
  const {formData, exifExtractedValues, dateInputChangeHandler} = useFormContext();

  return (
    <div className='date-picker-container'>
      {console.log()}
      <input 
        type='date' 
        onChange={(e) => {
          dateInputChangeHandler(e)
        }}
        value={formData['captureDate'].value || exifExtractedValues.dateTimeDigitized || ''}
      />
    </div>
  )
}