// TODO: remove redundant parts 
// SOURCE: SVG Loader Animation by Nikhil Krishnan. Link: https://codepen.io/nikhil8krishnan/pen/rVoXJa 
// svg component for loader(s) 
import React from 'react'

export default function Loader({height, width}) {
  // STYLES
  // orbit
  const orbitColor = '#994C00';
  const orbitWidth = '1';
  const orbitOpacity = '1';
  // planet
  // fill color
  const planetColorFill1 = '#00FFFF';
  const planetColorFill2 = '#FF0000';
  const planetColorFill3 = '#FFFF00';
  // stroke color
  const planetColorStroke1 = '#00FFFF';
  const planetColorStroke2 = '#FF0000';
  const planetColorStroke3 = '#FFFF00';
  // size
  const planetColorSize1 = '1.5';
  const planetColorSize2 = '3';
  const planetColorSize3 = '7';
  return (
    <div style={{display:'flex', height: height, width: width}}> 
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
       
        {/* orbits */}
        {/* 1 */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke={orbitColor}
          strokeWidth={orbitWidth}
          opacity={orbitOpacity}
          ></circle>
        {/* planets */}
        {/* 1 */}
        <circle cx="26" cy="54" r={planetColorSize1} fill={planetColorFill1} stroke={planetColorStroke1} strokeWidth="1">
        <animateTransform
            attributeName="transform"
            dur="1.5s"
            from="360 50 52"
            repeatCount="indefinite"
            to="0 50 48"
            type="rotate"
            ></animateTransform>
        </circle>
        {/* 2 */}
        <circle cx="26" cy="54" r={planetColorSize2} fill={planetColorFill2} stroke={planetColorStroke2} strokeWidth="1">
          <animateTransform
            attributeName="transform"
            dur="2.5s"
            from="360 50 52" 
            repeatCount="indefinite"
            to="0 50 48" 
            type="rotate"
            ></animateTransform>
        </circle>
        {/* 3 */}
        <circle cx="26" cy="54" r={planetColorSize3} fill={planetColorFill3} stroke={planetColorStroke3} strokeWidth="1">
        <animateTransform
            attributeName="transform"
            dur="4s"
            from="0 50 48"
            repeatCount="indefinite"
            to="360 50 52"
            type="rotate"
          ></animateTransform>
        </circle>
      </svg>
    </div>

  // STYLES
  // orbit
  // const orbitColor = '#994C00';
  // const orbitWidth = '1';
  // const orbitOpacity = '1';
  // // planet
  // // fill color
  // const planetColorFill1 = '#00FFFF';
  // const planetColorFill2 = '#FF0000';
  // const planetColorFill3 = '#FFFF00';
  // const planetColorFill4 = '#FF8000';
  // // stroke color
  // const planetColorStroke1 = '#00FFFF';
  // const planetColorStroke2 = '#FF0000';
  // const planetColorStroke3 = '#FFFF00';
  // const planetColorStroke4 = '#994C00';
  // // size
  // const planetColorSize1 = '1.5';
  // const planetColorSize2 = '3';
  // const planetColorSize3 = '7';
  // const planetColorSize4 = '3';
    //     <div style={{display:'flex', height: height, width: width}}> 
    //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    //     {/* center star */}
    //     {/* <circle
    //       cx="50"
    //       cy="50"
    //       r="10"
    //       fill="#FFFF33"
    //       stroke="#CCCC00"
    //       strokeWidth={2}
    //       opacity={1}
    //       ></circle> */}
    //     {/* orbits */}
    //     {/* 1 */}
    //     <circle
    //       cx="50"
    //       cy="50"
    //       r="40"
    //       fill="none"
    //       stroke={orbitColor}
    //       strokeWidth={orbitWidth}
    //       opacity={orbitOpacity}
    //       ></circle>
    //     {/* 2 */}
    //     <circle
    //       cx="50"
    //       cy="50"
    //       r="25"
    //       fill="none"
    //       stroke={orbitColor}
    //       strokeWidth={orbitWidth}
    //       opacity={orbitOpacity}
    //       ></circle>
    //     {/* 3 */}   
    //     <circle
    //       cx="50"
    //       cy="50"
    //       r="10"
    //       fill="none"
    //       stroke={orbitColor}
    //       strokeWidth={orbitWidth}
    //       opacity={orbitOpacity}
    //       ></circle>
    //     {/* planets */}
    //     {/* 1 */}
    //     <circle cx="10" cy="54" r={planetColorSize1} fill={planetColorFill1} stroke={planetColorStroke1} strokeWidth="1">
    //       <animateTransform
    //         attributeName="transform"
    //         dur="3.5s"
    //         from="0 50 48"
    //         repeatCount="indefinite"
    //         to="360 50 52"
    //         type="rotate"
    //         ></animateTransform>
    //     </circle>
    //     {/* 2 */}
    //     <circle cx="26" cy="54" r={planetColorSize2} fill={planetColorFill2} stroke={planetColorStroke2} strokeWidth="1">
    //       <animateTransform
    //         attributeName="transform"
    //         dur="2s"
    //         from="360 50 52" 
    //         repeatCount="indefinite"
    //         to="0 50 48" 
    //         type="rotate"
    //         ></animateTransform>
    //     </circle>
    //     {/* 3 */}
    //     <circle cx="41.5" cy="54" r={planetColorSize3} fill={planetColorFill3} stroke={planetColorStroke3} strokeWidth="1">
    //       <animateTransform
    //         attributeName="transform"
    //         dur="1.5s"
    //         from="0 50 48"
    //         repeatCount="indefinite"
    //         to="360 50 52"
    //         type="rotate"
    //         ></animateTransform>
    //     </circle>
    //   </svg>
    // </div>
  );
}