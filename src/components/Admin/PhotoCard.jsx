import React, {useEffect} from 'react'
import Button from '../UI/Button'
import './PhotoCard.css'
import {getAllPhotoEntries, getSinglePhotoEntry, deletePhotoEntry} from '../../helper/axiosRequests'
import {transformDate} from '../../helper/dateUtilities'
import {useModalContext} from '../contexts/ToggleModalContext'
import {useFormContext} from '../contexts/FormContext'
import {useAuthContext} from '../contexts/AuthenticationContext'
import {useNavigate, useLocation} from 'react-router'
import {OPERATIONS} from '../../helper/dataStorage'
import Timestamp from '../Timestamp'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function PhotoCard({collection}) {
  // ROUTING
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const navToPrevPage = () => navigate('/login', { state: {from: location}, replace: true});
  // CONTEXTS
  const {toggleModalHandler, setActiveID, setID} = useModalContext();
  const {data, setData, setMessage} = useFormContext();
  const {auth, setAuth} = useAuthContext();
  // HOOK
  const axiosPrivate = useAxiosPrivate();
  // EFFECT
  useEffect(() => { // get all data on initial render
    (async () => {
      try {
        const response = await getAllPhotoEntries(axiosPrivate, collection, auth.userID); // fetch entries, update state  
        setData(response.photoEntries); // store entries in state
        setMessage(response.message); // set message
      } catch(error) {
        navToPrevPage(); // navigate unauth user back to login page
        // setAuth({});
      }
    })() 
  }, []) 
  // delete and refetch photo entries
  const deletePhotoEntryHandler = async (id) => {
    try {
      const responseDelete = await deletePhotoEntry(id, axiosPrivate, collection);
      setMessage(responseDelete.message);
      const responseGetAll = await getAllPhotoEntries(axiosPrivate, collection, auth.userID); // fetch entries, update state  
      setData(responseGetAll.photoEntries); // store entries in state
    } catch(error) {
      navToPrevPage(); // navigate unauth user back to login page
      // setAuth({});
    }
  }

  return (
    <>
      {data?.map(card => (
        /* CARD CONTAINER */
        <div key={card._id} className='image-card-container'>
          {/* CONTROL PANEL */}
          {/* edit */}
          <div className='image-card-control-panel'>
            <Button 
              customStyle={'control-panel-edit'}
              clicked={async () => {
                try {
                  const response = await getSinglePhotoEntry(card._id, axiosPrivate, collection); // fetch entry data
                  setActiveID(response.photoEntry); // set active entry
                  toggleModalHandler(OPERATIONS.UPDATE_PHOTO); // open modal
                  setMessage(response.message); // set message
                } catch(error) {
                  navToPrevPage(); // navigate unauth user back to login page
                  // setAuth({});  
                }
              }}
            > Edit </Button>
            {/* delete */}
            <Button 
              customStyle={'control-panel-edit'}
              clicked={() => deletePhotoEntryHandler(card._id)} 
            > Delete </Button>
            {/* view */}
            <Button 
              customStyle={'control-panel-edit'}
              clicked={() => {
                setID(card._id)
                toggleModalHandler(OPERATIONS.FULLSCREEN_VIEW) }}
            > View </Button>
            {/* map */}
            <Button 
              customStyle={'control-panel-edit'}
              clicked={() => {
                setID(card._id)
                toggleModalHandler(OPERATIONS.MAP_VIEW) }}
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
            {/* timestamp */}
            <div className='image-card-content-data image-card-content-data--timestamp'> 
              <Timestamp dateCreation={card.createdAt} dateLastUpdate={card.updatedAt} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}