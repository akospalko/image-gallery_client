import React, {useState, useEffect, useRef, useCallback} from 'react'
import './PhotoSlider.css'

export default function PhotoSlider({slides = [], parentWidth, imgFile}) {
  // REFERENCE
  const timerRef = useRef(null);
  // STATES
  const [currentIndex, setCurrentIndex] = useState(0);
  const [didLoad, setDidLoad] = useState(false);

  // STYLES
  const slideStyles = {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const navigationButtons = 'photo-slider-navigation-button';
  const navigationButtonLeft = [navigationButtons, 'photo-slider-navigation-button--left'].join(' ');
  const navigationButtonRight = [navigationButtons, 'photo-slider-navigation-button--right'].join(' ');
  const sliderStyles = {
    display: 'flex',
    position: 'relative',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  };
  const slidesContainerStyles = {
    display: 'flex',
    height: '100%',
    transition: 'transform ease-out 0.3s',
  };
  const slidesContainerOverflowStyles = {
    overflow: 'hidden',
    height: '100%',
    borderRadius: '10px',
  };
  //FUNCTIONALITIES
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1; 
    setCurrentIndex(newIndex);
  }
  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1; 
    setCurrentIndex(newIndex);
  }, [currentIndex, setCurrentIndex, slides])

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

    // display loaded images
    const displayImageStyle = didLoad ? {} : {visiblity: 'hidden'}

  const getSlideStylesWithBackground = (slideIndex) => ({
    ...slideStyles,
    // backgroundImage: `url(${slides[slideIndex].photoURL})`,
    width: `${parentWidth}px`,
  });
  const getSlidesContainerStylesWithWidth = () => ({
    ...slidesContainerStyles,
    width: parentWidth * slides?.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  });
  // EFFECT
  useEffect(() => {
    // clear timer from previous render (restarts timer on each occasion when we use the slider) 
    if(timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // create new timer (restart timer after not using slider)  
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, [3000])
    // clean up memory
    return () => {clearTimeout(timerRef.current)}
  }, [nextSlide])

  return (
    <div style={sliderStyles}>
      {/* slider navigation button */}
      <div className='photo-slider-navigation-container'>
        <div className={navigationButtonLeft} onClick={prevSlide}> {'❰'} </div>
        <div className={navigationButtonRight} onClick={nextSlide}> {'❱'} </div>
      </div>
      {/* photo frame window */}
      <div style={slidesContainerOverflowStyles}>
        {/* photos slides container (row of photos) */}
        <div style={getSlidesContainerStylesWithWidth()}>
          {/* {slides?.map((_, slideIndex) => (
            <img key={slideIndex} src={slides[slideIndex].photoURL} style={getSlideStylesWithBackground(slideIndex)} onLoad={() => {setDidLoad(true)}} />
          ))} */}
          {slides?.map((_, slideIndex) => (
            <> 
             {imgFile(slides[slideIndex].photoURL, getSlideStylesWithBackground(slideIndex), slideIndex)} 
            </>
            // <img key={slideIndex} src={slides[slideIndex].photoURL} style={getSlideStylesWithBackground(slideIndex)} onLoad={() => {setDidLoad(true)}} />
          ))}
          {/* {slides?.map((_, slideIndex) => (
            <div key={slideIndex} style={getSlideStylesWithBackground(slideIndex)}></div>
          ))} */}
        </div>
      </div>
      {/* tracker */}
      <div className='photo-slider-tracker'>
        {slides?.map((_, i) => (
          <span 
          key={i} 
          className={i === currentIndex ? 'photo-slider-tracker-elem photo-slider-tracker-elem--active' : 'photo-slider-tracker-elem'} 
          onClick={() => goToSlide(i)}> </span>
        ))}
      </div>
    </div>
  );
}