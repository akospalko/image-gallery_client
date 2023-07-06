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
  LeafletIcon, 
  OSMIcon,
  AWSIcon, 
  MongoDBIcon,
  MongooseIcon } from '../SVG/Icons';

export default function About() {
  // CONSTANTS
  // Icon: size, color
  const iconSize = '50%';
  const iconColor = 'var(--color-accent--light)';
  // Text
  // short project intro
  const projectIntroductionText = (
    <article>
        <p>
          This project is a simple <span className='about-highlighted-text'>photo gallery </span> designed to store and display photographs with geolocation information. Authenticated users have access to view the photos, like them, add them to their own collection, read more details about them, and even locate them on a map.
        </p>
        <p>
          The inspiration behind this project stems from my deep passion for photography, particularly aerial photography utilizing UAV (drone) technology. Additionally it also served as a valuable means of developing my skills in both <span className='about-highlighted-text'> frontend</span> and <span className='about-highlighted-text'> backend</span> web development, as well as allowing me to explore aspects of <span className='about-highlighted-text'> aesthetics</span>, <span className='about-highlighted-text'> user experience (UX)</span>, and  <span className='about-highlighted-text'> user interface (UI)</span> design.
        </p>
    </article>
  )
  // attribution & used technologies
  const usedTechnologiesText = (
    <article>
      <p className='about-indent-text'>
        The web app was developed combining various web technologies: frontend was built with <span className='about-highlighted-text'> HTML</span>, <span className='about-highlighted-text'> CSS</span> and <span className='about-highlighted-text'> JavaScript</span>, utilizing the robust <span className='about-highlighted-text'>React</span> library. Additionally, several helpful npm packages such as router, responsive, toastify, zoom-pan-pinch, and axios were integrated. For visual elements, <span className='about-highlighted-text'> SVG Repo</span>, <span className='about-highlighted-text'> Iconify</span> and <span className='about-highlighted-text'> unDraw</span> resources were utilized.
      </p>
      <p className='about-indent-text'>
        <span className='about-highlighted-text'> Leaflet</span>, a JavaScript library, was used to create dynamic and interactive maps. The project takes advantage of this library to showcase photos on the map. Furthermore, the app provides users with a variety of base layers, thanks to OSM, Stamen, and Esri, offering different map styles and layers.
      </p>
      <p className='about-indent-text'>
        On the backend, <span className='about-highlighted-text'> Node.js</span> and <span className='about-highlighted-text'> Express</span> were harnessed to create a server, implementing a REST API architecture. Some of the packages used: jsonwebtokens and bcrypt for implementing authentication, sharp for image processing, nodemailer for sending emails.
      </p>
      <p className='about-indent-text'>
        For data storage, <span className='about-highlighted-text'> MongoDB</span>, a flexible NoSQL database was employed with <span className='about-highlighted-text'> Mongoose</span> to handle data modeling and interaction. To provide scalable and reliable storage solutions for the app, <span className='about-highlighted-text'> AWS S3</span> was leveraged. 
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
      {/* <Footer /> */}
    </div>
  )
}