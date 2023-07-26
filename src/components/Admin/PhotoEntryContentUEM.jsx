// Display user engagement metrics (uem) content for photo entry component   
import React from 'react';
import './PhotoEntries.css';
import { LikeIcon, AddToCollectionIcon, DownloadIcon } from '../SVG/Icons';

export default function PhotoEntryContentUEM({ collectedUEM }) {
  // CONSTANTS
  const iconSize = '20px';
  const iconColor = 'var(--text-color--high-emphasis)';

  // TEMPLATE
  const uemTemplate = [{
      name: 'like',
      icon: <LikeIcon width={ iconSize } height={ iconSize } stroke={ iconColor } fill={ iconColor } />,
      data: collectedUEM?.likes,
      label: 'photo likes',
    }, {
      name: 'collection',
      icon: <AddToCollectionIcon width={ iconSize } height={ iconColor } stroke={ iconColor } />, 
      data: collectedUEM?.inCollection,
      label: 'in collection'
    }, {
      name: 'downloaded',
      icon: <DownloadIcon width={ iconSize } height={ iconSize } fill={ iconColor } />, 
      data: collectedUEM?.downloads,
      label: 'downloaded'
    }
  ];

  return(
    uemTemplate.map(content => 
      <div key={ content.name } className='pe-layout-content-uem'>
        {/* data conainer */}
        <div className='pe-layout-content-uem-data'>  
          {/* icon */}
          <div className='pe-layout-content-uem-icon'> { content.icon } </div>
          {/* amount  */}
          <span className='pe-layout-content-uem-amount'> { content?.data } </span>
        </div>
        {/* label */}
        <span className='pe-layout-content-uem-label'> { content.label } </span>
      </div> 
    )
  )
}