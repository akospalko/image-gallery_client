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
      label: 'likes',
      title: 'number of likes'
    }, {
      name: 'collection',
      icon: <AddToCollectionIcon width={ iconSize } height={ iconColor } stroke={ iconColor } />, 
      data: collectedUEM?.inCollection,
      label: 'saved to collection',
      title: 'number of times the photo was saved to collection'
    }, {
      name: 'downloads',
      icon: <DownloadIcon width={ iconSize } height={ iconSize } fill={ iconColor } />, 
      data: collectedUEM?.downloads,
      label: 'downloads',
      title: 'number of times the photo was downloaded'
    }
  ];

  return(
    uemTemplate.map(content => 
      <div 
        key={ content.name } 
        title={ content.title } 
        className='pe-layout-content-uem'
      >
        <div className='pe-layout-content-uem-data'>  
          {/* icon */}
          <div className='pe-layout-content-uem-icon'> { content.icon } </div>
          {/* amount  */}
          <span className='pe-layout-content-uem-label'> { content.label } </span>
          <span className='pe-layout-content-uem-amount'> { content?.data } </span>
        </div>
        {/* label */}
      </div> 
    )
  )
}