// Responsive photo carousel wrapper with animation. SRC: https://codesandbox.io/s/wl29r?file=/src/Carousel.js
import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = ({ children, isImageLoadingStyle }) => {
  console.log(isImageLoadingStyle)
  // STATES
  const [counter, setCounter] = useState(1);
  const [pause, setPause] = useState(false);
  const content = children;
  // HANDLERS
  const handleNext = () => {
    if (counter !== content.length) {
      setCounter(counter + 1);
    } else {
      setCounter(1);
    }
  };
  const handlePre = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
    } else {
      setCounter(content.length);
    }
  };
  const handlePage = page => {
    setCounter(page);
  };
  const handleMouse = () => {
    setPause(!pause);
  };
  // EFFECT
  useEffect(() => {
    let interval = setInterval(() => {
      if (!pause) {
        handleNext();
      } else {
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div style={isImageLoadingStyle} className="carousel-container">
      <div
        className="carousel-slide"
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        {content.map((item, index) => (
          <div
            className={counter - 1 === index ? "show" : "not-show"}
            key={index}
          > {item}
          </div>
        ))}
        <button className="prev" onClick={handlePre}>
          &#10094;
        </button>
        <button className="next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
      <div className="page">
        {content.map((item, index) => (
          <span
            key={index}
            className={counter - 1 === index ? "dot active" : "dot"}
            onClick={() => handlePage(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
