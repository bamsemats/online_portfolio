import { useState, useEffect, useRef } from "react";
import Data from "./data";
import "./styles.css";
import cssLogo from "./assets/css3-original.svg";
import htmlLogo from "./assets/html5-original.svg";
import javaScriptLogo from "./assets/javascript-original.svg";
import reactLogo from "./assets/react-original.svg";

export default function References() {
  return (
    <div className="references-wrapper">
      {/* <span className="title-text">Skills</span> */}
      <div className="references-container">
        <div className="references-div">
          <div className="language-logo-container ">
            <img src={htmlLogo} className="language-logo" />
            <h4 className="gradient">HTML</h4>
          </div>
          <div className="language-logo-container ">
            <img src={cssLogo} className="language-logo" />
            <h4 className="gradient">CSS</h4>
          </div>
          <div className="language-logo-container ">
            <img src={javaScriptLogo} className="language-logo" />
            <h4 className="gradient">JavaScript</h4>
          </div>
          <div className="language-logo-container ">
            <img src={reactLogo} className="language-logo" />
            <h4 className="gradient">React</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
