// source: https://dev.to/justincy/4-patterns-for-responsive-props-in-react-39ak#responsive-props
import {useState, useEffect} from 'react'

export default function useMediaQuery(query) {
  // STATE
  const [matches, setMatches] = useState(false);
  // EFFECT
  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      const handler = (event) => setMatches(event.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );
  return matches;
}