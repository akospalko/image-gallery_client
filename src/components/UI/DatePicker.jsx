// custom date input with date picking option
import React, {useRef, useEffect} from 'react'
import './DatePicker.css'
import { useFormContext } from '../contexts/FormContext' 
import { useThemeContext } from '../contexts/ThemeContext';  

export default function DatePicker() {
  // CONTEXTS
  const {formData, dateInputChangeHandler} = useFormContext();
  const {theme} = useThemeContext();
  // REF
  const datePickerRef = useRef();
  // EFFECT
  useEffect(() => {
    if(formData.captureDate.value) {
      datePickerRef.current.style.color = 'var(--text-color--high-emphasis)';
    } else {
      datePickerRef.current.style.color = 'var(--text-color--medium-emphasis)';
    }
  }, [])
  
  const dateInputCheckContentHandler = (e) => {
    e.preventDefault();
    if(formData.captureDate.value) {
      datePickerRef.current.style.color = 'var(--text-color--high-emphasis)';
    } else {
      datePickerRef.current.style.color = 'var(--text-color--medium-emphasis)';
    }
  }  
  return (
    <div className='date-picker-container'>
      <input
        ref={datePickerRef}
        style={{colorScheme: theme}} 
        type='date' 
        onChange={(e) => {
          dateInputChangeHandler(e);
          dateInputCheckContentHandler();
        }}
        value={formData?.captureDate.value || ''}
      />
    </div>
  )
}