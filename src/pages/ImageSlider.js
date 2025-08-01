import React, { useState } from 'react';
import   "../styles/ImageSlider.css";

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <div className="slider-image-wrapper">
        <button className="arrow left" onClick={goPrev}>‹</button>
        <img src={images[current]} alt={`Slide ${current}`} className="main-image" />
        <button className="arrow right" onClick={goNext}>›</button>
      </div>

      {/* Dot Indicators */}
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={current === index ? 'dot active' : 'dot'}
            onClick={() => goToSlide(index)}
          >
            {current === index ? '●' : '○'}
          </span>
        ))}
      </div>

      {/* Thumbnail Previews */}
      {/* <div className="thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={`thumbnail ${current === index ? 'selected' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div> */}
    </div>
  );
}

export default ImageSlider;
