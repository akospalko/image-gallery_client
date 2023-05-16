// Add toggle functionality to input text reaching a specific char-s in length; display text preview
import { useState } from 'react';

export default function useToggleText(initialText='') {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [maxCharLength, setMaxCharLength] = useState(50);
  // HANDLERS
  const toggleTextHandler = () => {
    setIsTextVisible(prev => !prev);
  };
  // return shortened version of text if (reaches a specified length) or return initialText 
  const getShortText = () => {
    if (typeof initialText !== 'string') return '';
    if (initialText.length > maxCharLength) {
      return `${initialText.substring(0, maxCharLength)}...`;
    }
    return initialText;
  };

  return {
    isTextVisible,
    maxCharLength, setMaxCharLength,
    toggleTextHandler,
    getShortText,
  };
}