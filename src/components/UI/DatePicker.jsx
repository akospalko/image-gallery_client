// custom date input with date picking option
import React, { useRef, useEffect } from 'react'
import './DatePicker.css'
import { useFormContext } from '../contexts/FormContext' 
import { useThemeContext } from '../contexts/ThemeContext';  

export default function DatePicker() {
  // CONTEXTS
  const { formData, dateInputChangeHandler } = useFormContext();
  const { theme } = useThemeContext();
 
  // REF
  const datePickerRef = useRef();
  
  // EFFECT
  useEffect(() => {
    if (!datePickerRef.current) return;
    let localRef = null; // store ref locally, later used as a reference in cleanup function 
    localRef = datePickerRef.current;
    if(formData.captureDate.value) {
      datePickerRef.current.style.color = 'var(--text-color--high-emphasis)';
    } else {
      datePickerRef.current.style.color = 'var(--text-color--medium-emphasis)';
    }
    return () => localRef = null;  
  }, [formData.captureDate.value])
  
  return (
    <div className='date-picker-container'>
      <input
        ref={ datePickerRef }
        style={{ colorScheme: theme }} 
        type='date' 
        onChange={ dateInputChangeHandler }
        value={ formData?.captureDate.value || '' }
      />
    </div>
  )
}