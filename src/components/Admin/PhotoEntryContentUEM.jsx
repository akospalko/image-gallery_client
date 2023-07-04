// Display user engagement metrics (uem) content for photo entry component   
import React from 'react';
import './PhotoEntries.css';
import { LikeIcon, AddToCollectionIcon } from '../SVG/Icons';

export default function PhotoEntryContentUEM({ collectedUEM }) {
  // PROPS 
  // TEMPLATE
  const uemTemplate = [{
      name: 'like',
      icon: <LikeIcon width='20px' height='20px' stroke='var(--text-color--high-emphasis)' fill='var(--text-color--high-emphasis)' />,
      data: collectedUEM?.likes,
      label: 'photo likes',
    }, {
      name: 'collection',
      icon: <AddToCollectionIcon width='20px' height='20px' stroke='var(--text-color--high-emphasis)' />, 
      data: collectedUEM?.inCollection,
      label: 'saved to collection'
    }
  ];

  return(
    <>
      { uemTemplate.map(content => 
        <div key={ content.name } className='pe-layout-content-uem'>
          {/* data conainer */}
          <div className='pe-layout-content-uem-data'>  
            {/* icon */}
            <div className='pe-layout-content-uem-icon'> { content.icon } </div>
            {/* amount  */}
            <span className='pe-layout-content-uem-amount'> { content.data } </span>
          </div>
          {/* label */}
          <span className='pe-layout-content-uem-label'> { content.label } </span>
        </div> 
      )}
    </>
  )
}