// source: https://dev.to/justincy/4-patterns-for-responsive-props-in-react-39ak#responsive-props
import useMediaQuery from "./useMediaQuery";

export default function useBreakpoints() {
  const breakpoints = {
    isMobile_250: useMediaQuery("(min-width: 250px)"),
    isMobile_300: useMediaQuery("(min-width: 300px)"),
    isMobile_350: useMediaQuery("(min-width: 350px)"),
    isMobile_350_750: useMediaQuery("(min-width: 350px) and (max-width: 750px)"),
    isMobile_400: useMediaQuery("(min-width: 400px)"),
    isMobile_500: useMediaQuery("(min-width: 500px)"),
    isTablet_750: useMediaQuery("(min-width: 750px)"),
    isPC_1080: useMediaQuery("(min-width: 1080px)"),
    active: "isMobile_350"
  };
  if (breakpoints.isMobile_250) breakpoints.active = "isMobile_250";
  if (breakpoints.isMobile_300) breakpoints.active = "isMobile_300";
  if (breakpoints.isMobile_350) breakpoints.active = "isMobile_350";
  if (breakpoints.isMobile_350_750) breakpoints.active = "isMobile_350_750";
  if (breakpoints.isMobile_400) breakpoints.active = "isMobile_400";
  if (breakpoints.isMobile_500) breakpoints.active = "isMobile_500";
  if (breakpoints.isTablet_750) breakpoints.active = "isTablet_750";
  if (breakpoints.isPC_1080) breakpoints.active = "isPC_1080";

  return breakpoints;
}