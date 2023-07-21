// TODO: navToPrevPage - navigates to login after operation 
// Reusable modal for create/update photo entry 
import React, { useEffect, useState } from 'react';
import './CreateUpdatePhotoEntry.css';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import LoaderIcon from '../SVG/Loader';
import { buildInputFields, convertFormData } from '../../helper/utilities';
import { OPERATIONS } from '../../helper/dataStorage';
import { postPhotoEntry, updatePhotoEntry } from '../../helper/axiosRequests';
import { statusMessages } from '../../helper/dataStorage';
import { STATUS_MESSAGES, statusDefault } from '../../helper/statusMessages';
import { basicInputFieldValidator } from '../../helper/formValiadation';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import useFetchPhotoEntries from '../hooks/useFetchPhotoEntries';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useFormContext } from '../contexts/FormContext';
import { useModalContext } from '../contexts/ToggleModalContext';
import { useLoaderContext } from '../contexts/LoaderContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { useStatusContext } from '../contexts/StatusContext';

export default function CreateUpdatePhotoEntry(props) {
  // PROPS
  const { operation, formTemplate, collection, label } = props;
  
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: { from: location }, replace: true });
 
  // CONTEXT
  const { activePhotoEntry, setActivePhotoEntry, setActiveID, toggleModalHandler } = useModalContext();
  const {
    formData, setFormData, 
    photoFile, setPhotoFile,  
    setValidationMessages, 
    isFormTouched,
    isFormValid
  } = useFormContext();
  const { isLoading, loaderToggleHandler } = useLoaderContext();
  const { theme } = useThemeContext();
  const { status, setStatus, sendToast } = useStatusContext();
  
  // HOOKS
  const axiosPrivate = useAxiosPrivate();
  const { fetchHomePhotoEntries, fetchGalleryPhotoEntries } = useFetchPhotoEntries();
  
  // STATE
  const [isFormReady, setIsFormReady] = useState(false);
  
  // EFFECTS
  // set up input validation status
  useEffect(() => {
    if(!Object.keys(formTemplate).length) return; 
    let validationObject = {};
    for(let field in formTemplate) {
      validationObject = {...validationObject, [field]: {status: false, message: '', touched: false}}
    }
    setValidationMessages(validationObject);
    return () => { setValidationMessages({}) }
  }, [])
  // set up form on mount, reset form on unmount
  useEffect( () => { 
    setFormData(formTemplate);
    return () => {
      setFormData({});
      setPhotoFile({});
    } 
  }, [] )
  // update photo entry: populate form with active photo + status message validation (used for character counter) on first render
  useEffect(() => {
    if(operation !== OPERATIONS.UPDATE_PHOTO || !activePhotoEntry || !Object.keys(formData).length || isFormReady) return;
    // update form with filtered fields' values
    let updatedForm = {...formData}; // copy form
    for(let elem in formData) {
      const updatedItem = {...updatedForm[elem]}; 
      updatedItem.value = activePhotoEntry[elem];
      updatedForm[elem] = updatedItem; 
      // update input field validation messages
      const { required, minLength, maxLength, fieldName, value } = updatedForm[elem];
      const validationStatus = basicInputFieldValidator(elem, value, required, minLength, maxLength, fieldName);
      setValidationMessages(prev => {
        if(elem === 'photoFile') {
          return {...prev, [elem]: { ...prev[elem], status: true, message: '', touched: false } }
        } else {
          return { ...prev, [elem]: { ...prev[elem], ...validationStatus, touched: false } }
        }
      });
    }
    setFormData(updatedForm);  
    setIsFormReady(true);      
  }, [formData, operation, activePhotoEntry, isFormReady, setIsFormReady, setValidationMessages, setFormData])
  
  // HANDLERS
  // submit form for createPhoto (create new photo entry)
  const createPhotoEntryHandler = async(e, formData, photoFile) => {
    e.preventDefault();
    try {
      loaderToggleHandler('PHOTO_ENTRY_SUBMIT', undefined, true);
      const convertedData = {...convertFormData(formData), photoFile}; // simplyfy data before sending request, merge form data with photoFile  
      const responseCreate = await postPhotoEntry(convertedData, axiosPrivate, collection); // post entry to server
      const {success, message, photoEntry } = responseCreate ?? {};
      if(success === true) {
        sendToast(message);
        // collection === 'gallery' ? await fetchGalleryPhotoEntries(navToPrevPage) : await fetchHomePhotoEntries(navToPrevPage); 
        collection === 'gallery' ? await fetchGalleryPhotoEntries() : await fetchHomePhotoEntries(); 
        setFormData({}); // reset form 
        toggleModalHandler(operation);
        setPhotoFile({});
        setActiveID({})
      } else {
        setStatus({
            code: 'CODE',
            success: success,
            message: message
          }
        );
      }
    } catch (error) { 
      setStatus({ ...statusDefault, message: STATUS_MESSAGES.ERROR_REQUEST }); 
      // navToPrevPage();
    } finally {      
      loaderToggleHandler('PHOTO_ENTRY_SUBMIT', undefined, false);
    }
  }
  // submit form for createPhoto (update new photo entry)
  const updatePhotoEntryHandler = async (e, formData, photoFile) => {
    e.preventDefault();
    try {
      loaderToggleHandler('PHOTO_ENTRY_SUBMIT', undefined, true);
      const convertedData = {...convertFormData(formData), photoFile}; // simplyfy data before sending request, merge form data with photoFile  
      const responseUpdate = await updatePhotoEntry(activePhotoEntry._id, convertedData, axiosPrivate, collection);
      const {success, message, photoEntry } = responseUpdate ?? {};
      if(success === true) {
        sendToast(message)
        // collection === 'gallery' ? await fetchGalleryPhotoEntries(navToPrevPage) : await fetchHomePhotoEntries(navToPrevPage); 
        collection === 'gallery' ? await fetchGalleryPhotoEntries() : await fetchHomePhotoEntries(); 
        setFormData({}); // reset form 
        toggleModalHandler(operation);
        setPhotoFile({});
        setActiveID({})
      } else {
        setStatus({ 
          code: 'CODE',
          success: success,
          message: message
        });
      }
    } catch(error) { 
      setStatus({ ...statusDefault, message: STATUS_MESSAGES.ERROR_REQUEST });
      // navToPrevPage();
    } finally { 
      loaderToggleHandler('PHOTO_ENTRY_SUBMIT', undefined, false);
    }
  }

  // BUTTON
  // submit photo entry (create/udate) or close modal
  const photoEntryButton = (
    <div className='shared-button-wrapper shared-button-wrapper--create-update-photo-entry'> 
      { toggleModalHandler ?  
        <Button 
          buttonStyle='button-form-submit'
          type='button' 
          clicked={() => {
            setFormData({});
            activePhotoEntry && setActivePhotoEntry({});
            photoFile.name && setPhotoFile({});
            setStatus(statusDefault);
            toggleModalHandler(operation);
          } }
        > { CONSTANT_VALUES.BUTTON_CANCEL } 
        </Button> : null }   
        <Button 
          buttonStyle='button-form-submit'
          form='form-create-update-photo-entry'
          type='submit' 
          disabled={ (!isFormValid || !isFormTouched) || isLoading.PHOTO_ENTRY_SUBMIT }
          clicked={ (e) => {
            operation === OPERATIONS.CREATE_PHOTO ? createPhotoEntryHandler(e, formData, photoFile) : updatePhotoEntryHandler(e, formData, photoFile) 
          }}
        >  { isLoading.PHOTO_ENTRY_SUBMIT ? <LoaderIcon height='25px' width='25px' stroke='var(--text-color--high-emphasis)'/> : CONSTANT_VALUES.BUTTON_SUBMIT } 
        </Button>      
    </div> 
  );


  return (
    // FORM WRAPPER 
    <div className='create-update-photo-entry-modal-wrapper'>
      {/* FORM */}
      <Form id='form-create-update-photo-entry'> 
        { formData && buildInputFields(formTemplate).map(elem => (
        <Input 
          key={ elem.name } 
          name={ elem.name } 
          label={ label }
          textareaStyle='textarea-create-update-photo-entry'
          labelStyle='input-create-update-photo-entry-label'
        /> 
      )) }
      </Form>
      { /* STATUS MESSAGE */ }
      { status.message && <div className='shared-status-message'> <p> { status.message || '' } </p> </div> }
      { /* SUBMIT FORM BUTTON */ }
      { photoEntryButton }
    </div>
  )
}