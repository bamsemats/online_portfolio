import React from 'react';
import "./styles.css";
import cssLogo from "./assets/w3_css-official.svg";
import reactLogo from "./assets/reactjs-ar21.svg";
import javaLogo from "./assets/java-ar21.svg";
import mysqlLogo from "./assets/mysql-ar21.svg";
import dockerLogo from "./assets/docker-ar21.svg";
import gitLogo from "./assets/git-scm-ar21.svg";
import pythonLogo from "./assets/python-svgrepo-com.svg";
import htmlLogo from "./assets/html-5-logo-svgrepo-com.svg";
import javascriptLogo from "./assets/javascript-svgrepo-com.svg";
import nodeLogo from "./assets/node-js-svgrepo-com.svg";
import {
  FaNode
} from "react-icons/fa";
import {
  TiHtml5
} from "react-icons/ti";
import {
  SiJavascript
} from "react-icons/si";


const logos = [
  { src: htmlLogo, alt: "HTML" },
  { src: cssLogo, alt: "CSS" },
  { src: javascriptLogo, alt: "JavaScript" },
  { src: reactLogo, alt: "React" },
  { src: javaLogo, alt: "Java" },
  { src: pythonLogo, alt: "Python" },
  { src: mysqlLogo, alt: "MySQL" },
  { src: dockerLogo, alt: "Docker" },
  { src: gitLogo, alt: "Git" },
  { src: nodeLogo, alt: "Node" },
];

export default function References() {
  return (
    <div className="references-wrapper">
      <div className="references-container">
        <div className="references-div">
          {/* Render three times for safe seamless loop across all screen sizes */}
          {logos.concat(logos, logos).map((logo, index) => (
            <div key={index} className="language-logo-container">
              <img src={logo.src} className="language-logo" alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

