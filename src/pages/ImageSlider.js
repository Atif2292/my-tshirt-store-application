import React, { useState } from 'react';
import "../styles/ImageSlider.css";

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index) => setCurrent(index);
  const goNext = () => setCurrent((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="slider-container">
      <div className="slider-image-wrapper">
        <button className="arrow left" onClick={goPrev}>‹</button>
        <img
          src={images[current]}
          alt={`Slide ${current}`}
          className="main-image"
          loading="lazy"
        />
        <button className="arrow right" onClick={goNext}>›</button>
      </div>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={current === index ? 'dot active' : 'dot'}
            onClick={() => goToSlide(index)}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
