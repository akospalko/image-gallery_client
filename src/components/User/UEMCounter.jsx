// User engagement metrics counter
import React from 'react';
import './UEMCounter.css';

const UEMCounter = (props) => {
  // PROPS
  const {
    likes,
    inCollection,
    downloads,
    customContainerStyle,
    customItemStyle,
  } = props;

  const uemCounterTemplate = [
    {
      id: 0,
      label: 'likes',
      value: likes
    },
    {
      id: 1,
      label: 'in collection',
      value: inCollection
    },
    {
      id: 2,
      label: 'downloaded',
      value: downloads
    }
  ]
  
  return (
    <div className={ `uem-counter ${ customContainerStyle }` }>
      { uemCounterTemplate.map(metric => (
        <div key={ metric.id } className={ `uem-counter-item ${ customItemStyle }` }>
          <span> { metric?.label + ':' } </span> 
          <span> { metric?.value } </span> 
        </div>
      )) }
    </div> 
  )
}

export default React.memo(UEMCounter);