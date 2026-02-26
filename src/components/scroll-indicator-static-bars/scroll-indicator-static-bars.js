import { useState, useEffect } from "react";
import { CgShapeHexagon } from "react-icons/cg";
import "./styles.css";
import DarkMode from "../darkmode/darkmode";
import SelectorButton from "./selector-button";
import { IoMdMenu } from "react-icons/io";

export default function ScrollIndicatorStaticBars({
  click,
  darkTheme,
  onRandomize,
  menuToggle,
  menuState,
}) {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  function handleScrollEvent() {
    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage(100 * (howMuchScrolled / height));
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <div className="scroll-indicator-wrapper">
      <div className="scroll-indicator-container">
        <div
          className="scroll-indicator"
          style={{
            width: `${scrollPercentage}%`,
          }}
        ></div>
      </div>
      <div className="title-bar">
        <div className="title-bar-bg-clip">
          <div className="title-bar-logo">
            <div className="title-bar-logo-container">
              <CgShapeHexagon className="logo-icon" />
            </div>
            <div className="title-bar-logo-name">Mats Rönnqvist</div>
          </div>
        </div>
        <div className="title-bar-title">Portfolio</div>
        <div className="page-selectors">
          <SelectorButton name="home" />
          <SelectorButton name="apps" />
          <SelectorButton name="about" />
          <SelectorButton name="contact" />
          <div className="menu-list-div">
            <button className="toggle-menu-list-button" onClick={menuToggle}>
              <IoMdMenu className="burger-menu" />
            </button>
            <div className={`menu-list ${menuState ? "open" : "closed"}`}>
              <SelectorButton name="home" onClick={menuToggle} />
              <SelectorButton name="apps" onClick={menuToggle} />
              <SelectorButton name="about" onClick={menuToggle} />
              <SelectorButton name="contact" onClick={menuToggle} />
            </div>
          </div>
          <DarkMode
            className="darkmode-button"
            darkTheme={darkTheme}
            click={click}
            onRandomize={onRandomize}
          />
        </div>
      </div>
    </div>
  );
}

// <div className="side-panel">
//   <TreeView />
// </div>
