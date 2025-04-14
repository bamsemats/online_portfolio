import { useState, useEffect, useRef } from "react";
import Data from "./data";
import { CgShapeHexagon } from "react-icons/cg";
import "./styles.css";
import DarkMode from "../darkmode/darkmode";
import TreeView from "../tree-view/tree-view";
import SelectorButton from "./selector-button";
import { IoMdMenu } from "react-icons/io";

export default function ScrollIndicatorStaticBars({
  url,
  click,
  darkTheme,
  mainData,
  selectPage,
  menuToggle,
  menuState,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  function burgerMenuStyles() {
    return menuState ? "" : `paddingRight: "14px"`;
  }

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();

      setData(data.products);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  function handleScrollEvent() {
    // console.log(
    //   document.body.scrollTop,
    //   document.documentElement.scrollTop,
    //   document.documentElement.scrollHeight,
    //   document.documentElement.clientHeight
    // );

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
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  // console.log(scrollPercentage);

  if (errorMessage) {
    return <div>Error! {errorMessage}</div>;
  }

  if (loading) {
    return <div>Loading data! Please wait</div>;
  }

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
        <div className="title-bar-logo">
          <div className="title-bar-logo-container">
            <CgShapeHexagon className="logo-icon" />
          </div>
          <div className="title-bar-logo-name">Mats Rönnqvist</div>
        </div>
        <div className="title-bar-title">Portfolio</div>
        <div className="page-selectors">
          <SelectorButton name="home" onClick={selectPage} />
          <SelectorButton name="apps" onClick={selectPage} />
          <SelectorButton name="about" onClick={selectPage} />
          {/* <SelectorButton name="contact" onClick={selectPage} /> */}
          <div className="menu-list-div" style={{ burgerMenuStyles }}>
            <button className="toggle-menu-list-button" onClick={menuToggle}>
              <IoMdMenu className="burger-menu" />
            </button>
            <div className={`menu-list ${menuState ? "open" : "closed"}`}>
              <SelectorButton name="home" onClick={selectPage} />
              <SelectorButton name="apps" onClick={selectPage} />
              <SelectorButton name="about" onClick={selectPage} />
              {/* <SelectorButton name="contact" onClick={selectPage} /> */}
            </div>
          </div>
          {/* <button
            className="selector-apps"
            onClick={() => {
              selectPage("apps");
            }}
          >
            Apps
          </button> */}
          <DarkMode
            className="darkmode-button"
            darkTheme={darkTheme}
            click={click}
          />
        </div>
      </div>
    </div>
  );
}

// <div className="side-panel">
//   <TreeView />
// </div>
