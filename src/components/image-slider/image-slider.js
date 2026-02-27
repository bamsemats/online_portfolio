import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiLoader } from "react-icons/fi";
import "./styles.css";

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const grabData = useCallback(async () => {
    setLoading(true);
    const page = Math.floor(Math.random() * 50);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    grabData();
  }, [grabData]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="lab-widget-container bento-image-slider">
      <div className="widget-header-row">
        <h4 className="widget-title">Dynamic Image Gallery</h4>
        <button className="refresh-btn" onClick={grabData} disabled={loading}>
          {loading ? <FiLoader className="spin" /> : "Shuffle"}
        </button>
      </div>

      <div className="slider-viewport">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="slider-placeholder"
            >
              <FiLoader className="spin-large" />
              <p>Fetching visual assets...</p>
            </motion.div>
          ) : error ? (
            <motion.div key="error" className="slider-placeholder error">
              <p>Error: {error}</p>
            </motion.div>
          ) : (
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="slide-wrapper"
            >
              <img 
                src={images[currentIndex]?.download_url} 
                alt={`Slide ${currentIndex}`} 
                className="slider-img"
              />
              <div className="img-info">
                <span>By {images[currentIndex]?.author}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !error && (
          <>
            <button className="nav-btn prev" onClick={prevSlide}><FiChevronLeft /></button>
            <button className="nav-btn next" onClick={nextSlide}><FiChevronRight /></button>
            
            <div className="slider-indicators">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
