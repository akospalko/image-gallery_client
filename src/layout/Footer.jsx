// TODO: add project logo
// Responsive footer component
import React from 'react';
import './Footer.css';
import { PersonalLogoIcon, GithubIcon, LinkedInIcon, ArrowTipIcon } from '../components/SVG/Icons';
import { useMediaQuery } from 'react-responsive';
import { CONSTANT_VALUES } from '../helper/constantValues';

export default function Footer() {
  // CONSTANTS
  // Icon: size, color
  const iconSize = '100%';
  const iconColor = 'var(--color-accent--light)';

  // TEMPLATE
  // Social icons 
  const socialIconsTemplate = [
    { 
      title: 'github',
      icon: <GithubIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://github.com/akospalko'
    },
    { 
      title: 'linkedin',
      icon: <LinkedInIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://www.linkedin.com/in/%C3%A1kos-palk%C3%B3-87a5191a2/'
    }, 
    {
      title: 'personal logo',
      icon: <PersonalLogoIcon width={ iconSize } height={ iconSize } fill={ iconColor } />,
      url: 'https://palkoakos.onrender.com/',
    }
  ];

  // MEDIA QUERIES
  const isBelow350px = useMediaQuery({ query: '(max-width: 350px)' });
  const isBelow550px = useMediaQuery({ query: '(max-width: 550px)' });

  // ELEMENTS
  // Social icons
  const socialIcons = (
    <div className='social-icons-container'>
      { /* social icon */ }
      { socialIconsTemplate.map(card => (
        <a key={ card.title } title={ card.title } href={ card.url } target="_blank" rel="noopener noreferrer" className='social-icon-card'> 
          <div className='social-icon'> 
            { card.icon } 
          </div>
        </a>
      )) }
    </div>
  );
    
  // Logo mark: logo icon + signature
  const logoMark = (
    <div className='footer-logo-mark'>
      { /* logo */ }
      <div className='footer-logo-mark-icon'>
        <PersonalLogoIcon width={ iconSize } height={ iconSize } /> 
      </div>
      { /* signature */ }
      <div className='footer-logo-mark-signature'> 
        {  <span> Ákos Palkó, { isBelow350px ? <br /> : null }  2023 </span>  }
      </div>
    </div>
  )

  // Scroll to top - responsive 
  // handler
  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  // displayed element for small (below 550px) screen 
  const scrollToTopSmallScreen = (
    <div onClick={ scrollToTopHandler }  className='footer-scroll-to-top'>
      <div className='footer-scroll-to-top-icon' >
        <ArrowTipIcon width={ iconSize } height={ iconSize } fill={ iconColor } /> 
      </div>
      <div className='footer-scroll-to-top-text'> 
        <span> { CONSTANT_VALUES.INFO_SCROLL_TO_TOP } </span> 
      </div> 
    </div>
  ) 
  // displayed element for large (above 550px) screen
  const scrollToTopLargeScreen = (
    <div className='footer-scroll-to-top'>
      <div onClick={ scrollToTopHandler } className='footer-scroll-to-top-text'> 
        <span> { CONSTANT_VALUES.INFO_SCROLL_TO_TOP } </span> 
      </div> 
      <div onClick={ scrollToTopHandler }  className='footer-scroll-to-top-icon' >
        <ArrowTipIcon width={ iconSize } height={ iconSize } fill={ iconColor } /> 
      </div>
    </div>
  ) 

  // CONDITIONAL RENDERING
  // footer for small screens 
  const footerSmallScreen = (
    <>
      { scrollToTopSmallScreen }
      { logoMark }
      { socialIcons }
    </>
  )
  // footer for large screens
  const footerLargeScreen = (
    <>
      { socialIcons }
      { logoMark }
      { scrollToTopLargeScreen }
    </>
  )

  return (
    <div className='footer-container' >
      { isBelow550px ? footerSmallScreen : footerLargeScreen }
    </div>
  )
}