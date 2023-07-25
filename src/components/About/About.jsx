// Project introduction page
import React from 'react';
import './About.css';
import ProjectMetrics from './ProjectMetrics';
import Footer from '../../layout/Footer';
import { CONSTANT_VALUES } from '../../helper/constantValues';
import { 
  ReactIcon,
  HTMLIcon, 
  CSSIcon,
  JSIcon,
  SVGRepoIcon,
  IconifyIcon, 
  NodeJSIcon, 
  ExpressJSIcon, 
  PostmanIcon,
  LeafletIcon, 
  OSMIcon,
  AWSIcon, 
  MongoDBIcon,
  MongooseIcon } from '../SVG/Icons';

// helper component to hihglight text
export function HighlightText({ text }) {
  return ( <span className='about-highlighted-text'>{ text }</span> )
}  


<HighlightText text=''/>

export default function About() {
  // CONSTANTS
  // Icon: size, color
  const iconSize = '50%'; 
  const iconColor = 'var(--text-color--high-emphasis)';
  // Text
  // short project intro
  const projectIntroductionText = (
    <article>
      <p>
        This project is a <HighlightText text='photo gallery'/> designed to store and display photographs with geolocation information. Authenticated users have access to view the photos, like, download, add them to their own collection, read more details about them, even locate them on a map.
      </p>
      <p>
        The inspiration behind this project stems from my deep passion for photography, particularly aerial photography utilizing UAV (drone) technology. Additionally it also served as a valuable means of developing my skills in both <HighlightText text='frontend'/> and <HighlightText text='backend'/> web development, as well as allowing me to explore aspects of <HighlightText text='aesthetics'/>, <HighlightText text='user experience (UX)'/>, and <HighlightText text='user interface (UI)'/> design.
      </p>
    </article>
  )
  // attribution & used technologies
  const usedTechnologiesText = (
    <article>
      <p className='about-indent-text'>
        The web-app was developed combining various web technologies: frontend was built with <HighlightText text='HTML'/>, <HighlightText text='CSS' /> and <HighlightText text='JavaScript' />, utilizing <HighlightText text='React' /> library. Additionally, several helpful npm packages such as router, responsive, toastify, zoom-pan-pinch, and axios were utilized. For visual elements, <HighlightText text='SVGRepo' />, <HighlightText text='Iconify' /> and <HighlightText text='unDraw' /> resources were utilized.
      </p>
      <p className='about-indent-text'>
        <HighlightText text='Leaflet' />, a JavaScript library, was used to create dynamic and interactive maps. The project takes advantage of this library to showcase photos' locations on the map. Furthermore, the app provides users with a variety of base layers, thanks to <HighlightText text='OSM' />, Stamen, and Esri, offering different map styles and layers.
      </p>
      <p className='about-indent-text'>
        On the backend, <HighlightText text='Node.js' /> and <HighlightText text='Express' /> and <HighlightText text='Postman' /> were harnessed to create a server with REST architecture. Some of the used packages: jsonwebtokens and bcrypt for implementing authentication, sharp for image processing, nodemailer for sending emails.
      </p>
      <p className='about-indent-text'>
        For data storage, <HighlightText text='MongoDB' />, a flexible NoSQL database was employed with <HighlightText text='Mongoose' /> to handle data modeling and interaction. To provide scalable and reliable storage solutions for the app, <HighlightText text='AWS S3' />  was leveraged. 
      </p>
    </article>
  );

  // TEMPLATE
  // attribution icon template array
  const attributionIconTemplate = [
    {
      title: 'html',
      icon: <HTMLIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    }, {
      title: 'css',
      icon: <CSSIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    }, {
      title: 'js',
      icon: <JSIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    }, {
      title: 'react',
      icon: <ReactIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://react.dev/',
    }, {
      title: 'leaflet',
      icon: <LeafletIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://leafletjs.com/',
    }, {
      title: 'openstreetmap',
      icon: <OSMIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://www.openstreetmap.org/',
    }, {
      title: 'svgrepo',
      icon: <SVGRepoIcon width={ iconSize } height={ iconSize } fill={ iconColor } letterFill='var(--bg-color--main)' />,
      url: 'https://www.svgrepo.com/',
    }, {
      title: 'iconify',
      icon: <IconifyIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://iconify.design/',
    }, {
      title: 'nodejs',
      icon: <NodeJSIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://nodejs.org/',
    }, {
      title: 'expressjs',
      icon: <ExpressJSIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://expressjs.com/',
    }, {
      title: 'postman',
      icon: <PostmanIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://www.postman.com/',
    }, { 
      title: 'aws',
      icon: <AWSIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://aws.amazon.com/pm/serv-s3/',
    }, {
      title: 'mongodb',
      icon: <MongoDBIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://www.mongodb.com/',
    }, {
      title: 'mongoose',
      icon: <MongooseIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://mongoosejs.com/',
    } 
  ]

  // ELEMENTS  
  // project short intro text
  const projectIntroduction = (
    <div className='about-project-introduction'>
      <h2> { CONSTANT_VALUES.TITLE_ABOUT_PROJECT_INTRODUCTION } </h2>
      { projectIntroductionText }
    </div>
  )

  // used technologies text & attribution icons 
  const usedTechnologiesAndAttribution = (
    <div className='about-used-technologies'>
      <h2> { CONSTANT_VALUES.TITLE_ABOUT_ATTRIBUTION } </h2>
      <div className='about-attribution-text'>
        { usedTechnologiesText }
      </div>
      <div className='about-attribution-cards'> 
        { attributionIconTemplate.map( card => (
          <a key={ card.title } title={ card.title } href={ card.url } target="_blank" rel="noopener noreferrer" className='about-attribution-card'> 
            { card.icon } 
          </a>
        )) }
      </div>
    </div>
  )

  return (
    <div className='shared-page-container shared-page-container--align-items-center'>
      { /* project introduction */ }
      { projectIntroduction }
      { /* project metrics */ }
      <ProjectMetrics />
      { /* used technologies: tech icons, text */ }
      { usedTechnologiesAndAttribution }
      { /* footer */ }
      <Footer />
    </div>
  )
}