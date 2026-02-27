import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import "./styles.css";

export default function Stars({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <div className="lab-widget-container bento-stars">
      <div className="widget-header-row">
        <h4 className="widget-title">Feedback Component</h4>
        <div className="rating-badge">
          {rating > 0 ? `${rating} / ${noOfStars} Stars` : "Rate this"}
        </div>
      </div>

      <div className="star-rating-display">
        <div className="stars-wrapper">
          {[...Array(noOfStars)].map((_, index) => {
            index += 1;

            const isActive = index <= (hover || rating);

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="star-box"
              >
                <FaStar
                  className={`star-icon ${isActive ? "active" : "inactive"}`}
                  onClick={() => handleClick(index)}
                  onMouseMove={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave()}
                  size={40}
                />
              </motion.div>
            );
          })}
        </div>
        
        <div className="rating-text-feedback">
          {rating === 5 && <motion.span initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>Excellent! â­ï¸</motion.span>}
          {rating === 4 && <span>Great!</span>}
          {rating === 3 && <span>Good</span>}
          {rating === 2 && <span>Fair</span>}
          {rating === 1 && <span>Poor</span>}
          {rating === 0 && <span className="muted">Hover and click to rate</span>}
        </div>

        <button className="reset-rating-btn" onClick={() => setRating(0)}>
          Clear Rating
        </button>
      </div>
    </div>
  );
}
