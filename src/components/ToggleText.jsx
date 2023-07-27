// Toggle preview/full text. Displays short text if input does not reach a specific char length + toggle button 
import React from 'react'
import useToggleText from './hooks/useToggleText'
import Button from './UI/Button';
import { ArrowTipIcon } from './SVG/Icons';

export default function ToggleText({ text }) {
  // HOOK
  const { isTextVisible, toggleTextHandler, getShortText, maxCharLength } = useToggleText(text);

  return (
    <>
      {isTextVisible ?  <span> { text } </span> : <span> { getShortText() } </span>}
      { text.length > maxCharLength && <Button 
        buttonStyle='button-toggle-text' 
        title={ `${ isTextVisible ? 'Hide' : 'Show' } text` } 
        clicked={ toggleTextHandler }
      > 
        <ArrowTipIcon 
          rotate={ isTextVisible ? '' : 'rotate(180deg)' } 
          width='15px' height='15px' 
          fill='var(--text-color-light--high-emphasis)' 
        />
      </Button> }
    </>
  );
}