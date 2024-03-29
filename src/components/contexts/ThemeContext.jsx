// Theme context: toggle logic, theme and color states 
// Resources: https://betterprogramming.pub/a-complete-guide-to-implementing-dark-mode-in-react-47af893b22eb
import React, { useState, createContext, useContext, useLayoutEffect } from 'react';

const ThemeLayoutProvider = createContext();
export const useThemeContext = () => useContext(ThemeLayoutProvider);
export default function ThemeContext ({children}) {
  
  // STATE
  const [theme, setTheme] = useState('dark');
  const [colors, setColors] = useState({});
  // EFFECT
  // Detecting default theme
  useLayoutEffect(() => {
    // get browser default color-scheme
    const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
    // detect tehdefault state: read from local storage || browser's default theme
    const localStorageTheme = localStorage.getItem('default-theme'); // get default-theme from local storage
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light'; // check browser default value
    setTheme(prev => prev = localStorageTheme || browserDefault);
    document.documentElement.className = theme; // set active theme - add dark || light to :root elem 
    // get css theme colors, store in state:
    const colorMain = getComputedStyle(root).getPropertyValue('--bg-color--main');
    const colorTernaryTransparentLow = getComputedStyle(root).getPropertyValue('--bg-color--ternary-transparent-low');
    const colorTernaryTransparentMedium = getComputedStyle(root).getPropertyValue('--bg-color--ternary-transparent-medium');
    const colorTernaryTransparentHigh = getComputedStyle(root).getPropertyValue('--bg-color--ternary-transparent-high');
    setColors(prev => (
      { ...prev, 
        colorMain: colorMain, 
        colorTernaryTransparentLow: colorTernaryTransparentLow,
        colorTernaryTransparentMedium: colorTernaryTransparentMedium,  
        colorTernaryTransparentHigh: colorTernaryTransparentHigh  
      }));
  }, [theme, setColors])
  // HANDLER
  // check current theme, and set the opposite as a new theme  
  const toggleThemeHandler = () => {
    setTheme(prev => {
      const isCurrentDark = prev === 'dark';
      localStorage.setItem('default-theme', isCurrentDark ? 'light' : 'dark'); // sotre user's theme selection in local storage
      return isCurrentDark ? 'light' : 'dark'; // update state
    });
  }
  return (<ThemeLayoutProvider.Provider value={{theme, colors, setTheme, toggleThemeHandler}}> {children} </ThemeLayoutProvider.Provider>)
}