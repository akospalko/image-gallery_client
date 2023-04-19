// Responsive photo carousel wrapper with animation. SRC: https://codesandbox.io/s/wl29r?file=/src/Carousel.js
import React, { useState, useEffect } from "react";
import "./Carousel.css";
import Button from "../UI/Button";

const Carousel = ({ children, hideImageStyle }) => {
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
    <div style={hideImageStyle} className="carousel-container">
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
        <Button buttonStyle='button-carousel prev' clicked={handlePre}> &#10094; </Button>
        <Button buttonStyle='button-carousel next' clicked={handleNext}> &#10095; </Button>
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