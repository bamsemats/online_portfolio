import "../../App.css";
import codingWallpaper from "../../coding-wallpaper.jpg";
import { useState } from "react";
import { BsHexagon } from "react-icons/bs";
import Accordian from "../accordian/accordian";
import RandomColor from "../randomcolor/randomcolor";
import References from "../references/references";
import Stars from "../stars/stars";
import ImageSlider from "../image-slider/image-slider";
import LoadMore from "../load-more/load-more";
import TreeView from "../tree-view/tree-view";
import DarkMode from "../darkmode/darkmode";
import ScrollIndicatorStaticBars from "../scroll-indicator-static-bars/scroll-indicator-static-bars";
import useLocalStorage from "../darkmode/useLocalStorage";
import HangMan from "../hangman/hangman";
import Tenzies from "../tenzies/tenzies";
import DynamicBG from "../../DynamicBG";
import AnimatedBG from "../../AnimatedBG";
import StaticBG from "../../StaticBG";
import "./media-queries.css";
import "./animations.css";

export default function AppsPage() {
  return (
    <div className="apps-page">
      {/* <img src={codingWallpaper} className="coding-wallpaper" /> */}
      <div className="apps-intro">
        <h3>My apps</h3>
        <article>
          Below you will find a selection of apps I have created using various
          techniques, languages and libraries.
        </article>
      </div>
      <div className="app-library-container">
        <Accordian />
        {/* <div className="separator-div"></div> */}
        <RandomColor />
        {/* <div className="separator-div"></div> */}
        <Stars />
        {/* <div className="separator-div"></div> */}
        <ImageSlider />
        {/* <div className="separator-div"></div> */}
        <LoadMore />
        {/* <div className="separator-div"></div> */}
        <TreeView />
        {/* <div className="separator-div"></div> */}
        <HangMan />
        {/* <div className="separator-div"></div> */}
        <Tenzies />
      </div>
    </div>
  );
}
