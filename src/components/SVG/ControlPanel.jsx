// <!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
import React from "react";

// EDIT PHOTO ENTRY
export const Edit = ({height, width}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          fillRule="evenodd"
          d="M21.121 2.707a3 3 0 00-4.242 0l-1.68 1.68-7.906 7.906a1 1 0 00-.263.464l-1 4a1 1 0 001.213 1.213l4-1a1 1 0 00.464-.263l7.849-7.848 1.737-1.738a3 3 0 000-4.242l-.172-.172zm-2.828 1.414a1 1 0 011.414 0l.172.172a1 1 0 010 1.414l-1.017 1.017-1.555-1.617.986-.986zm-2.4 2.4l1.555 1.617-6.96 6.959-2.114.529.529-2.115 6.99-6.99zM4 8a1 1 0 011-1h5a1 1 0 100-2H5a3 3 0 00-3 3v11a3 3 0 003 3h11a3 3 0 003-3v-5a1 1 0 00-2 0v5a1 1 0 01-1 1H5a1 1 0 01-1-1V8z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}

// VIEW PHOTO
export const ViewPhoto = ({height, width}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="#000"
        version="1.1"
        viewBox="0 0 16 16"
      >
        <g fill="#000" fillOpacity="1" stroke="none">
          <path strokeWidth="0.875" d="M1 1v14h14V1zm1 1h12v12H2z"></path>
          <path
            strokeDasharray="none"
            strokeDashoffset="3.2"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeOpacity="0.551"
            strokeWidth="4"
            d="M5 3a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2zm0 1a1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1 1 1 0 011-1z"
            opacity="1"
            vectorEffect="none"
          ></path>
          <path
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeOpacity="1"
            strokeWidth="1"
            d="M3 12l1 1 3-3 1 1 2-2 2 2 1-1-3-3-2 2-1-1z"
          ></path>
        </g>
      </svg>
    </div>
  );
}

// LOCATION MARK FOR MAP VIEW
export const LocationMark = ({height, width}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="#000"
        stroke="#000"
        strokeWidth="0.004"
        version="1.1"
        viewBox="-38.43 -38.43 461.11 461.11"
        xmlSpace="preserve"
      >
        <g>
          <path d="M192.125 0C122.955 0 66.674 56.279 66.674 125.449c0 63.29 100.927 232.376 112.427 251.451 2.757 4.557 7.694 7.35 13.024 7.35s10.267-2.793 13.021-7.35c11.504-19.074 112.43-188.161 112.43-251.451C317.576 56.28 261.295 0 192.125 0zm0 339.1c-35.029-60.594-95.039-172.887-95.039-213.649 0-52.404 42.635-95.035 95.039-95.035s95.039 42.631 95.039 95.035c0 40.747-60.01 153.047-95.039 213.649z"></path>
          <path d="M192.125 53.214c-39.835 0-72.236 32.403-72.236 72.235 0 39.836 32.401 72.236 72.236 72.236 39.832 0 72.236-32.4 72.236-72.236 0-39.831-32.404-72.235-72.236-72.235zm0 114.06c-23.062 0-41.824-18.762-41.824-41.824 0-23.06 18.762-41.824 41.824-41.824 23.06 0 41.824 18.765 41.824 41.824 0 23.062-18.763 41.824-41.824 41.824z"></path>
        </g>
      </svg>
    </div> 
  );
}

// DELETE PHOTO ENTRY
export const Delete = ({height, width}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10 11v6M14 11v6M4 7h16M6 7h12v11a3 3 0 01-3 3H9a3 3 0 01-3-3V7zM9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"
        ></path>
      </svg>
    </div> 
  );
}

// LIKE PHOTO ENTRY (add / remove like) 
export const LikeIcon = ({height, width, stroke, fill, strokeWidth}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill={fill || "none"}
        viewBox="0 0 24 24"
      >
        <path
          stroke={stroke || "#000"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth || "2"}
          d="M11.445 20.76l-7.869-8.194C1.36 10.258 1.5 6.474 3.88 4.35c2.361-2.107 5.941-1.698 7.807.893l.314.435.314-.435c1.866-2.591 5.446-3 7.807-.893 2.38 2.125 2.52 5.91.303 8.217l-7.87 8.195a.763.763 0 01-1.109 0z"
        ></path>
      </svg>
    </div>
  );
}
// ADD PHOTO ENTRY TO USER'S OWN COLLECTION
export const AddToCollectionIcon = ({height, width, stroke, strokeWidth, fill}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="#000"
        className="icon flat-line"
        data-name="Flat Line"
        viewBox="0 0 24 24"
      >
        <rect
          width="14"
          height="14"
          x="3"
          y="3"
          fill={fill || "none"}
          strokeWidth={strokeWidth || "2"}
          rx="1"
        ></rect>
        <path
          fill="none"
          stroke={stroke || "#000"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth || "2"}
          d="M7 21h13a1 1 0 001-1V5"
        ></path>
        <path
          fill="none"
          stroke={stroke || "#000"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth || "2"}
          d="M7 10h6m-3-3v6m7 3V4a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1z"
          data-name="primary"
        ></path>
      </svg>
    </div>
  );
}

// REMOVE PHOTO ENTRY FROM USER'S OWN COLLECTION
export const RemoveFromCollectionIcon = ({height, width, stroke, strokeWidth, fill}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || "100%"}
        height={height || "100%"}
        fill={fill || "#000"}
        className="icon flat-line"
        data-name="Flat Line"
        viewBox="0 0 24 24"
      >
        <rect
          width="14"
          height="14"
          x="3"
          y="3"
          fill={fill || "none"}
          strokeWidth={strokeWidth || "2"} 
          rx="1"
        ></rect>
        <path
          fill="none"
          stroke={stroke || "#000"}
          strokeLinecap="round"
          strokeLinejoin="round"
           strokeWidth={strokeWidth || "2"}   
          d="M7 21h13a1 1 0 001-1V5"
        ></path>
        <path
          fill="none"
          stroke={stroke || "#000"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth || "2"}   
          d="M7 10h6m4 6V4a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1z"
          data-name="primary"
        ></path>
      </svg>
    </div>
  );
}
// ADDITIONAL INFORMATION ICON
export const InfoIcon = ({height, width}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
      >
        <g>
          <g
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <rect
              width="20"
              height="20"
              x="2"
              y="2"
              data-name="--Rectangle"
              rx="2"
              ry="2"
            ></rect>
            <path d="M12 12L12 16"></path>
            <path d="M12 8L12 8"></path>
          </g>
        </g>
      </svg>
    </div>
  );
}
// PHOTO VIEW
// ZOOM IN
export const ZoomInIcon = ({height, width, fill}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill={fill || "#000"}
        data-name="Layer 2"
        viewBox="0 0 35 35"
      >
        <path d="M13.739 26.47a13.11 13.11 0 1113.11-13.11 13.125 13.125 0 01-13.11 13.11zm0-23.72a10.61 10.61 0 1010.61 10.61 10.622 10.622 0 00-10.61-10.61z"></path>
        <path d="M33.121 34.75a1.246 1.246 0 01-.884-.366L20.858 23.005a1.25 1.25 0 011.767-1.768L34 32.616a1.25 1.25 0 01-.883 2.134zM18.312 15.061H9.424a1.25 1.25 0 010-2.5h8.888a1.25 1.25 0 110 2.5z"></path>
        <path d="M13.868 19.506a1.25 1.25 0 01-1.25-1.25V9.367a1.25 1.25 0 012.5 0v8.889a1.25 1.25 0 01-1.25 1.25z"></path>
      </svg>
    </div>
  );
}
// ZOOM OUT
export const ZoomOutIcon = ({height, width, fill}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill={fill || "#000"}
        data-name="Layer 2"
        viewBox="0 0 35 35"
      >
        <path d="M13.739 26.47a13.11 13.11 0 1113.11-13.11 13.125 13.125 0 01-13.11 13.11zm0-23.72a10.61 10.61 0 1010.61 10.61 10.622 10.622 0 00-10.61-10.61z"></path>
        <path d="M33.121 34.75a1.246 1.246 0 01-.884-.366L20.858 23.005a1.25 1.25 0 011.768-1.768L34 32.616a1.25 1.25 0 01-.883 2.134zM18.313 15.061H9.424a1.25 1.25 0 010-2.5h8.889a1.25 1.25 0 010 2.5z"></path>
      </svg>
    </div>
  );
}
// ZOOM OUT
export const ResoreViewIcon = ({height, width, fill}) => {
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill={fill || "#000"}
        className="icon"
        viewBox="0 0 1024 1024"
      >
        <path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path>
      </svg>
    </div>
  );
}