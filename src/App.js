import logo from "./logo.svg";
import codingWallpaper from "./coding-wallpaper.jpg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { BsHexagon } from "react-icons/bs";
import Accordian from "./components/accordian/accordian";
import RandomColor from "./components/randomcolor/randomcolor";
import References from "./components/references/references";
import Stars from "./components/stars/stars";
import ImageSlider from "./components/image-slider/image-slider";
import LoadMore from "./components/load-more/load-more";
import TreeView from "./components/tree-view/tree-view";
import DarkMode from "./components/darkmode/darkmode";
import ScrollIndicatorStaticBars from "./components/scroll-indicator-static-bars/scroll-indicator-static-bars";
import useLocalStorage from "./components/darkmode/useLocalStorage";
import HangMan from "./components/hangman/hangman";
import Tenzies from "./components/tenzies/tenzies";
import DynamicBG from "./DynamicBG";
import AnimatedBG from "./AnimatedBG";
import StaticBG from "./StaticBG";
import AppsPage from "./components/pages/apps-page";
import HomePage from "./components/pages/home-page";
import AboutPage from "./components/pages/about-page";
import ContactPage from "./components/pages/contact-page";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [currentSelected, setCurrentSelected] = useState("home");
  const [menuListOpen, setMenuListOpen] = useState(false);

  const closeTimeout = useRef(null);

  function handleMenuClick() {
    if (menuListOpen) {
      setMenuListOpen((prev) => !prev);
    } else {
      setMenuListOpen(true);
    }

    // Clear any existing timeout
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    // Set a new one
    closeTimeout.current = setTimeout(() => {
      setMenuListOpen(false);
      closeTimeout.current = null;
    }, 6000);
  }

  function setPage(page) {
    setCurrentSelected(page);
  }

  function handleToggle() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const data = "";

  document.addEventListener("DOMContentLoaded", () => {
    const interBubble =
      document.querySelector < HTMLDivElement > ".interactive";
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
        move();
      });
    }

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();
  });

  const pageToLoad = {
    apps: <AppsPage />,
    home: <HomePage />,
    about: <AboutPage />,
    contact: <ContactPage />,
  };

  return (
    <div className="App" data-theme={theme}>
      {/* <DynamicBG /> */}
      {/* <AnimatedBG /> */}
      <div className="coding-wallpaper-container">
        <img src={codingWallpaper} className="coding-wallpaper" />
      </div>
      <StaticBG current={currentSelected} />
      <ScrollIndicatorStaticBars
        url={"https://dummyjson.com/products?limit=100"}
        darkTheme={theme}
        click={handleToggle}
        mainData={data}
        selectPage={setPage}
        menuToggle={handleMenuClick}
        menuState={menuListOpen}
      />

      {pageToLoad[currentSelected] || <div>Error loading page</div>}

      <References />
    </div>
  );
}

export default App;
