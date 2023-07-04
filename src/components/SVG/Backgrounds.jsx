// RESOURCE: https://app.haikei.app/
// TODO: memoize icons with react memo
import React from "react";

// blob, landscape orientation for larger devices (16:9)
export function BlobLandscapeBackground({ color1, color2 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 0 960 540"
    >
      <path fill={ color1 || "#212529" } d="M0 0H960V540H0z"></path>
      <defs>
        <linearGradient x1="43.8%" x2="100%" y1="0%" y2="100%">
          <stop offset="14.444%" stopColor={ color1 || "#212529" }></stop>
          <stop offset="85.556%" stopColor={ color1 || "#212529" }></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient x1="0%" x2="56.3%" y1="0%" y2="100%">
          <stop offset="14.444%" stopColor={ color1 || "#212529" }></stop>
          <stop offset="85.556%" stopColor={ color1 || "#212529" }></stop>
        </linearGradient>
      </defs>
      <path
        fill={ color2 || "#bc4749" }
        d="M0 378c-61.3-17.6-122.6-35.2-181-64.5-58.4-29.3-114-70.3-146.4-124.5-32.3-54.2-41.5-121.6-50.6-189H0z"
        transform="translate(960)"
      ></path>
      <path
        fill={ color2 || "#bc4749" }
        d="M0-378c76.8 3.7 153.5 7.5 189 50.6 35.5 43.2 29.7 125.8 54.4 186.9C268-79.4 323-39.7 378 0H0z"
        transform="translate(0 540)"
      ></path>
    </svg>
  );
}

// blob portrait orientation for small devices (9:16)
export function BlobPortraitBackground({ color1, color2 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 0 540 960"
    >
      <path fill={ color1 || "#212529" } d="M0 0H540V960H0z"></path>
      <defs>
        <linearGradient x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="30%" stopColor={ color1 || "#212529" }></stop>
          <stop offset="70%" stopColor={ color1 || "#212529" }></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="30%" stopColor={ color1 || "#212529" }></stop>
          <stop offset="70%" stopColor={ color1 || "#212529" }></stop>
        </linearGradient>
      </defs>
      <path
        fill={ color2 || "#bc4749" }
        d="M0 378c-49.7-4.8-99.5-9.5-144.7-28.8-45.2-19.2-85.8-52.9-112.7-91.8-26.8-38.9-39.8-83.1-57.6-126.9-17.8-43.8-40.4-87.1-63-130.5H0z"
        transform="translate(540)"
      ></path>
      <path
        fill={ color2 || "#bc4749" }
        d="M0-378c43.3 20.6 86.6 41.1 133.2 56.5 46.6 15.3 96.5 25.5 134.1 54.2 37.6 28.8 62.8 76.1 79.2 123.8C362.8-95.9 370.4-47.9 378 0H0z"
        transform="translate(0 960)"
      ></path>
    </svg>
  );
}