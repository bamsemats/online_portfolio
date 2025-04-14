import { useState, useEffect, useRef } from "react";
import Data from "./data";
import "./styles.css";
import { FaStar } from "react-icons/fa";

export default function Stars() {
  const starArray = [1, 2, 3, 4, 5];
  const [currentSelectedStar, setCurrentSelectedStar] = useState(0);
  const [tempSelectedStar, setTempSelectedStar] = useState(0);

  function handleClick(i) {
    setCurrentSelectedStar(i + 1);
  }

  function mouseEnter(i) {
    setTempSelectedStar(i + 1);
  }

  function mouseLeave(i) {
    setTempSelectedStar(0);
  }

  return (
    <div className="app-container bento-stars">
      <span className="title-text">Star Rating App</span>
      <div className="star-container">
        {starArray.map((star, i) => {
          let filler = "";
          if (tempSelectedStar > 0) {
            filler = tempSelectedStar > i ? "url(#myGrad)" : "var(--btn-bg)";
          } else {
            filler = currentSelectedStar > i ? "url(#myGrad)" : "var(--btn-bg)";
          }
          return (
            <div className="star-div" key={i}>
              <svg width="30" height="30">
                <defs>
                  <linearGradient
                    id="myGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="gold" />
                    <stop offset="100%" stopColor="orange" />
                  </linearGradient>
                </defs>
                <FaStar
                  key={star}
                  id={i}
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => mouseEnter(i)}
                  onMouseLeave={() => mouseLeave(i)}
                  className="star-icon"
                  size={30}
                  style={{ fill: filler }}
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
