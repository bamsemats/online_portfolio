import React, { useState, useEffect } from 'react';
import './carousel.css';

const Faux3DCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="carousel-3d-container">
      <div className="carousel-3d-stage">
        {images.map((img, i) => {
          let position = "inactive";
          if (i === index) position = "active";
          else if (i === (index + 1) % images.length) position = "next";
          else if (i === (index - 1 + images.length) % images.length) position = "prev";

          return (
            <div key={i} className={`carousel-3d-item ${position}`}>
              <img src={img} alt={`Slide ${i}`} />
              <div className="carousel-3d-overlay"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faux3DCarousel;
