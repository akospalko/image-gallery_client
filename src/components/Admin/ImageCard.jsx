import React, {useEffect} from 'react'
import Button from '../UI/Button'
import './ImageCard.css'
import {getAllImageEntries, getSingleImageEntry, deleteImageEntry} from '../../helper/axiosRequests'
import {generateDateString, transformDate} from '../../helper/dateUtilities'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import { useAuthContext } from '../contexts/AuthenticationContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {useNavigate, useLocation} from 'react-router'

export default function ImageCard({collection}) {
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // CONTEXTS
  const {toggleModalHandler, setActiveID, setID} = useModalContext();
  const {data, setData, setMessage} = useFormContext();
  const {setAuth} = useAuthContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      try {
        const response = await getAllImageEntries(axiosPrivate, collection); // fetch entries, update state  
        setData(response.imageEntries); // store entries in state
        setMessage(response.message); // set message
      } catch(error) {
        navToPrevPage(); // navigate unauth user back to login page
        // setAuth({});
      }
    })() 
  }, []) 
  // delete and refetch image entries
  const deleteImageEntryHandler = async (id) => {
    try {
      const responseDelete = await deleteImageEntry(id, axiosPrivate, collection);
      setMessage(responseDelete.message);
      const responseGetAll = await getAllImageEntries(axiosPrivate, collection); // fetch entries, update state  
      setData(responseGetAll.imageEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
      // setAuth({});
    }
  }
  //elements
  const timestamp = (entry) => ( 
    <div className='image-card-content-data image-card-content-data--timestamp'> 
      <i> <span> Created at: {generateDateString(entry.createdAt)} </span> </i> 
      <i> <span> Last updated: {generateDateString(entry.updatedAt)} </span> </i> 
    </div>
  )

  return (
    <>
      {data?.map(card => (
        /* CARD CONTAINER */
        <div key={card._id} className='image-card-container'>
          {/* CONTROL PANEL */}
          {/* edit */}
          <div className='image-card-control-panel'>
            <Button 
              customStyle={'image-control-panel'}
              clicked={async () => {
                try {
                  const response = await getSingleImageEntry(card._id, axiosPrivate, collection); // fetch entry data
                  setActiveID(response.imageEntry); // set active entry
                  toggleModalHandler('updateImage'); // open modal
                  setMessage(response.message); // set message
                } catch(error) {
                  navToPrevPage(); // navigate unauth user back to login page
                  // setAuth({});  
                }
              }}
            > Edit </Button>
            {/* delete */}
            <Button 
              customStyle={'image-control-panel'}
              clicked={() => deleteImageEntryHandler(card._id)} 
            > Delete </Button>
            {/* view */}
            <Button 
              customStyle={'image-control-panel'}
              clicked={() => {
                setID(card._id)
                toggleModalHandler('viewImage') }}
            > View </Button>
            {/* map */}
            <Button 
              customStyle={'image-control-panel'}
              clicked={() => {
                setID(card._id)
                toggleModalHandler('viewMap') }}
            > Map </Button>
          </div>
          {/* content */}
          <div className='image-card-content'>
            <div className='image-card-content-data'> {card._id} </div>
            <div className='image-card-content-data image-card-content-data--title'> 
              <p> {card.title} </p>
            </div>
            <div className='image-card-content-data'> {transformDate(card.captureDate, '-', '.')} </div>
            <div className='image-card-content-data'> {card.gpsLatitude} </div>
            <div className='image-card-content-data'> {card.gpsLongitude} </div>
            <div className='image-card-content-data'> {card.author} </div>
            <div className='image-card-content-data image-card-content-data--description'> 
              <p> {card.description} </p>
            </div>
            {timestamp(card)}
          </div>
        </div>
      ))}
    </>
  )
}