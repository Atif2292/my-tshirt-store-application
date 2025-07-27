import React, { useState } from 'react';
import tshirts from '../data';

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: 'auto' }}>
      <img
        src={images[currentIndex]}
        alt="Product"
        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
      />
      <button onClick={prevImage} style={arrowBtnStyle('left')}>&larr;</button>
      <button onClick={nextImage} style={arrowBtnStyle('right')}>&rarr;</button>
    </div>
  );
}

const arrowBtnStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: '10px',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0,0,0,0.5)',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '35px',
  height: '35px',
  cursor: 'pointer',
  zIndex: 1,
});

export default ImageSlider;
