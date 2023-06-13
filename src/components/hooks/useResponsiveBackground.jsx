// Returns responsive background (svg) as inline style backgroundImage.
// Used as default background for pages 
import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { BlobLandscapeBackground, BlobPortraitBackground } from '../SVG/Backgrounds';
import { useThemeContext } from '../contexts/ThemeContext';
import { useMediaQuery } from 'react-responsive';

export default function useResponsiveBackground() {
  // HOOK 
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });
  // CONTEXT
  const { colors } = useThemeContext();
  // BACKGROUND
  // Set up responsive background
  const backgroundComponents = (
    <>
      { isLargeScreen ? 
        // Landscape for tablet/pc view
        <BlobLandscapeBackground color1={colors.colorMain} color2={colors.colorTernaryTransparentHigh} />
        : 
        // Portrait for mobile view
        <BlobPortraitBackground  color1={colors.colorMain} color2={colors.colorTernaryTransparentHigh} />
      }
    </>
  )
  // Convert svg component to string 
  const renderedBackground = encodeURIComponent(ReactDOMServer.renderToString(backgroundComponents));
  // Define background as inline style
  const pageBackground = {
    backgroundPosition: 'center', 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("data:image/svg+xml, ${renderedBackground}")`,
    backgroundColor: 'var(--bg-color--main)'
  }

  return { pageBackground }
}