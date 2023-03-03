// date timestamp for photo entries 
import React from 'react'
import {generateDateString} from '../helper/dateUtilities'

export default function Timestamp({dateCreation, dateLastUpdate}) {
  return (
    <>
      <i> <span> Created at: {generateDateString(dateCreation)} </span> </i> 
      <i> <span> Last updated: {generateDateString(dateLastUpdate)} </span> </i> 
    </>
  )
}

