import { useState, useEffect, useRef } from "react";
import Data from "./data";
import "./styles.css";
import cssLogo from "./assets/w3_css-official.svg";
import htmlLogo from "./assets/html5-ar21.svg";
import javaScriptLogo from "./assets/javascript-ar21.svg";
import reactLogo from "./assets/reactjs-ar21.svg";
import javaLogo from "./assets/java-ar21.svg";

export default function References() {
  return (
    <div className="references-wrapper">
      {/* <span className="title-text">Skills</span> */}
      <div className="references-container">
        <div className="references-div">
          <div className="language-logo-container ">
            <img src={htmlLogo} className="language-logo" />
          </div>
          <div className="language-logo-container ">
            <img src={cssLogo} className="language-logo" />
          </div>
          <div className="language-logo-container ">
            <img src={javaScriptLogo} className="language-logo" />
          </div>
          <div className="language-logo-container ">
            <img src={reactLogo} className="language-logo" />
          </div>
          <div className="language-logo-container ">
            <img src={javaLogo} className="language-logo" />
            
          </div>
        </div>
      </div>
    </div>
  );
}
