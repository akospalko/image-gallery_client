// Add toggle functionality to input text reaching a specific char-s in length; display text preview
import { useState } from 'react';

export default function useToggleText(initialText='') {
  const [text] = useState(initialText);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [maxCharLength, setMaxCharLength] = useState(50);

  // HANDLERS
  const toggleTextHandler = () => {
    setIsTextVisible(prev => !prev);
  };
  // return shortened version of text if (reaches a specified length) or return initialText 
  const getShortText = () => {
    if (typeof text !== 'string') return '';
    if (text.length > maxCharLength) {
      return `${text.substring(0, maxCharLength)}...`;
    }
    return text;
  };

  return {
    isTextVisible,
    maxCharLength, setMaxCharLength,
    toggleTextHandler,
    getShortText,
  };
}