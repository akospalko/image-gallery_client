import React, {useEffect} from 'react'
import Form from '../UI/Form'
import Input from '../UI/Input'
import {createImage, updateImage} from '../../helper/dataStorage'
import './ImageEntryModal.css'
import {buildInputFields} from '../../helper/buildInputFields'
import {postImageEntry, refetchImageEntries} from '../../helper/axiosRequests'
import {useModalContext} from '../contexts/ToggleModalContext'
import ViewImage from './ViewImage'
import {convertFormData} from '../../helper/convertFormData'

export default function ImageEntryModal({operation}) {
  const {setData, activeID, setActivID, setIsSubmittingForm} = useModalContext();
  //EFFECT
  useEffect(() => {
    console.log(activeID);
    for(let elem in activeID) {
      console.log(elem, activeID[elem]);
    }
  }, [])

  // SUBMIT
  // submit form for createImage (create new image entry)
  const createImageEntryHandler = async(e, form) => {
    e.preventDefault();
    // setIsSubmittingForm(true);
    console.log('create image entry');
    const convertedData = convertFormData(form); // perpare data to be transformed: convert form data to {entryName1: entryValue1, ...}
    await postImageEntry(convertedData); // send post request
    console.log('submitted values:', convertedData);
    //refetch data
    await refetchImageEntries(setData);
  }
  //submit form for createImage (update new image entry)
  const updateImageEntryHandler = (e, form) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    //TODO: update entries
    console.log('update image entry');
    console.log('submitted values:', form);
    setIsSubmittingForm(false);
  }

  //types of modals that we render based on the suplplied operation value
  const createImageEntryModal = (  
    <Form 
      title={'Create Image Entry'}
      operation = {operation}
      submit={createImageEntryHandler}
      initialValues={createImage}
      customStyle='image-create-update'
    >
      { buildInputFields(createImage).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={true}
          customStyle='image-create-update'
        />  
      )) }
    </Form>
  )
  const updateImageEntryModal = (
    <Form 
      title={'Update Image Entry'}
      operation={operation}
      submit={updateImageEntryHandler}
      initialValues={updateImage}
      customStyle='image-create-update'
    > 
      { buildInputFields(updateImage).map(elem => (
        <Input 
          key={elem.name} 
          name={elem.name} 
          label={true}
          customStyle='image-create-update'
        /> 
      )) }
    </Form>
  )

  const viewImageModal = <ViewImage/>;
  // render modal based on the supplied operation value
  let renderModal; 
  switch(operation) {
    case 'createImage':
      renderModal = createImageEntryModal;
      break; 
    case 'updateImage':
      renderModal = updateImageEntryModal;
      break; 
    case 'viewImage':
      renderModal = viewImageModal;
      break; 
  }

  return (
    <div className='modal-container'>
      { operation && renderModal }
    </div>
  )
}