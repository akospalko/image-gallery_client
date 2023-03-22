// SOURCE: SVG Loader Animation by Nikhil Krishnan. Link: https://codepen.io/nikhil8krishnan/pen/rVoXJa 
// svg component for loader(s) 
import React from 'react'

export default function Loader({height, width}) {
  // STYLES
  // orbit
  const orbitColor = '#FFE5CC';
  const orbitWidth = '1';
  const orbitOpacity = '0.3';
  // planet
  // fill color
  const planetColorFill1 = '#FF8000';
  const planetColorFill2 = '#FF8000';
  const planetColorFill3 = '#FF8000';
  const planetColorFill4 = '#FF8000';
  // stroke color
  const planetColorStroke1 = '#FF8000';
  const planetColorStroke2 = '#FF8000';
  const planetColorStroke3 = '#FF8000';
  const planetColorStroke4 = '#FF8000';
  // size
  const planetColorSize1 = '5';
  const planetColorSize2 = '2';
  const planetColorSize3 = '3';
  const planetColorSize4 = '1.5';
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        {/* orbits */}
        {/* 1 */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={orbitColor}
          strokeWidth={orbitWidth}
          opacity={orbitOpacity}
          ></circle>
        {/* 2 */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke={orbitColor}
          strokeWidth={orbitWidth}
          opacity={orbitOpacity}
          ></circle>
        {/* 3 */}   
        <circle
          cx="50"
          cy="50"
          r="18"
          fill="none"
          stroke={orbitColor}
          strokeWidth={orbitWidth}
          opacity={orbitOpacity}
          ></circle>
        {/* 4 */}  
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke={orbitColor}
          strokeWidth={orbitWidth}
          opacity={orbitOpacity}
        ></circle>
        {/* planets */}
        {/* 1 */}
        <circle cx="11" cy="54" r={planetColorSize1} fill={planetColorFill1} stroke={planetColorStroke1} strokeWidth="1">
          <animateTransform
            attributeName="transform"
            dur="4s"
            from="0 50 48"
            repeatCount="indefinite"
            to="360 50 52"
            type="rotate"
            ></animateTransform>
        </circle>
        {/* 2 */}
        <circle cx="21" cy="54" r={planetColorSize2} fill={planetColorFill2} stroke={planetColorStroke2} strokeWidth="0.5">
          <animateTransform
            attributeName="transform"
            dur="3s"
            from="0 50 48"
            repeatCount="indefinite"
            to="360 50 52"  
            type="rotate"
            ></animateTransform>
        </circle>
        {/* 3 */}
        <circle cx="33" cy="54" r={planetColorSize3} fill={planetColorFill3} stroke={planetColorStroke3} strokeWidth="0.5">
          <animateTransform
            attributeName="transform"
            dur="2s"
            from="0 50 48"
            repeatCount="indefinite"
            to="360 50 52"
            type="rotate"
            ></animateTransform>
        </circle>
        {/* 4 */}
        <circle cx="44" cy="54" r={planetColorSize4} fill={planetColorFill4} stroke={planetColorStroke4} strokeWidth="0.5">
          <animateTransform
            attributeName="transform"
            dur="1s"
            from="0 50 48"
            repeatCount="indefinite"
            to="360 50 52"
            type="rotate"
            ></animateTransform>
        </circle>
      </svg>
    </div>
  );
}
// // SOURCE: SVG Loader Animation by Nikhil Krishnan. Link: https://codepen.io/nikhil8krishnan/pen/rVoXJa 
// // svg component for loader(s) 
// import React from 'react'

// export default function Loader() {
  //   return (
    //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    //       <circle
    //         cx="50"
    //         cy="50"
//         r="44"
//         fill="none"
//         stroke="#fff"
//         strokeWidth="4"
//         opacity="0.5"
//       ></circle>
//       <circle
//         cx="50"
//         cy="50"
//         r="34"
//         fill="none"
//         stroke="#fff"
//         strokeWidth="4"
//         opacity="0.5"
//       ></circle>
//       <circle
//         cx="50"
//         cy="50"
//         r="24"
//         fill="none"
//         stroke="#fff"
//         strokeWidth="4"
//         opacity="0.5"
//       ></circle>
//       <circle cx="8" cy="54" r="6" fill="#fff" stroke="#e74c3c" strokeWidth="3">
//         <animateTransform
//           attributeName="transform"
//           dur="2s"
//           from="0 50 48"
//           repeatCount="indefinite"
//           to="360 50 52"
//           type="rotate"
//         ></animateTransform>
//       </circle>
//     </svg>
//   );
// }