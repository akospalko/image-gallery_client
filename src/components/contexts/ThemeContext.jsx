// Resources: https://betterprogramming.pub/a-complete-guide-to-implementing-dark-mode-in-react-47af893b22eb
import React, { useState, createContext, useContext } from 'react';

const ThemeLayoutProvider = createContext();
export const useThemeContext = () => useContext(ThemeLayoutProvider);
export default function ThemeContext ({children}) {
  // Detecting default theme
  // get browser default color-scheme
  const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  // detect tehdefault state: read from local storage || browser's default theme
  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem('default-theme'); // get default-theme from local storage
    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light'; // check browser default value
    return localStorageTheme || browserDefault;
  };
  // STATE
  const [theme, setTheme] = useState(getDefaultTheme());
  // HANDLER
  // check current theme, and set the opposite as a new theme  
  const toggleThemeHandler = () => {
    setTheme(prev => {
      const isCurrentDark = prev === 'dark';
      localStorage.setItem('default-theme', isCurrentDark ? 'light' : 'dark'); // sotre user's theme selection in local storage
      return isCurrentDark ? 'light' : 'dark'; // update state
    });
  }
  return (<ThemeLayoutProvider.Provider value={{theme, setTheme, toggleThemeHandler}}> {children} </ThemeLayoutProvider.Provider>)
}