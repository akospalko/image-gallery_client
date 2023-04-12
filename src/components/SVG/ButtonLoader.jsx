// SOURCE: https://icon-sets.iconify.design/svg-spinners/180-ring-with-bg/
// svg loader for buttons 
import React from 'react'

function ButtonLoader({height, width}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "100%"}
      height={height || "100%"}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 19a8 8 0 118-8 8 8 0 01-8 8z"
        opacity="0.25"
      ></path>
      <path
        fill="currentColor"
        d="M12 4a8 8 0 017.89 6.7 1.53 1.53 0 001.49 1.3 1.5 1.5 0 001.48-1.75 11 11 0 00-21.72 0A1.5 1.5 0 002.62 12a1.53 1.53 0 001.49-1.3A8 8 0 0112 4z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </path>
    </svg>
  );
}

export default ButtonLoader;