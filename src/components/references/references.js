import React from 'react';
import "./styles.css";
import cssLogo from "./assets/w3_css-official.svg";
import reactLogo from "./assets/reactjs-ar21.svg";
import javaLogo from "./assets/java-ar21.svg";
import mysqlLogo from "./assets/mysql-ar21.svg";
import dockerLogo from "./assets/docker-ar21.svg";
import gitLogo from "./assets/git-scm-ar21.svg"
import {
  FaNode
} from "react-icons/fa";
import {
  TiHtml5
} from "react-icons/ti";
import {
  SiJavascript
} from "react-icons/si";


export default function References() {
  return (
    <div className="references-wrapper">
      {/* <span className="title-text">Skills</span> */}
      <div className="references-container">
        <div className="references-div">
          <div className="language-logo-container ">
            <TiHtml5 className="language-logo" alt="HTML"/>
          </div>
          <div className="language-logo-container ">
            <img src={cssLogo} className="language-logo" alt="CSS"/>
          </div>
          <div className="language-logo-container ">
            <SiJavascript className="language-logo" alt="JavaScript"/>
          </div>
          <div className="language-logo-container ">
            <img src={reactLogo} className="language-logo" alt="React"/>
          </div>
          <div className="language-logo-container ">
            <img src={javaLogo} className="language-logo" alt="Java"/>
          </div>
          <div className="language-logo-container ">
            <img src={mysqlLogo} className="language-logo" alt="MySQL"/>
          </div>
          <div className="language-logo-container ">
            <img src={dockerLogo} className="language-logo" alt="Docker"/>
          </div>
          <div className="language-logo-container ">
            <img src={gitLogo} className="language-logo" alt="Git"/>
          </div>
          <div className="language-logo-container ">
            <FaNode className="language-logo" alt="Node"/>
          </div>
        </div>
      </div>
    </div>
  );
}
