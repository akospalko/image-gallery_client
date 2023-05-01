import React from "react";

export function UserIcon({height, width, fill, stroke}) {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g>
          <g>
            <g
              fill={fill || "none"}
              stroke={stroke || "#000"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export function MenuOpenIcon({height, width, fill, stroke}) {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg 
        fill={fill || "#000000"} 
        height="100%" 
        width="100%" 
        version="1.1" 
        id="XMLID_309_" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 24 24" xml:space="preserve">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> 
            <g id="menu"> 
              <g> <path d="M24,21H0v-2h24V21z M24,13H0v-2h24V13z M24,5H0V3h24V5z"> </path> </g> 
            </g> 
        </g>
      </svg>
    </div> 
  );
}

export function MenuCloseIcon({height, width, fill, stroke}) {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 -0.5 21 21"
      >
        <g>
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g fill={fill || "#000"} transform="translate(-419 -240)">
              <g transform="translate(56 160)">
                <path d="M375.0183 90L384 98.554 382.48065 100 373.5 91.446 364.5183 100 363 98.554 371.98065 90 363 81.446 364.5183 80 373.5 88.554 382.48065 80 384 81.446z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div> 
  );
}