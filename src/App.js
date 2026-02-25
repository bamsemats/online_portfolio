import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import References from "./components/references/references";
import ScrollIndicatorStaticBars from "./components/scroll-indicator-static-bars/scroll-indicator-static-bars";
import useLocalStorage from "./components/darkmode/useLocalStorage";
import StaticBG from "./StaticBG";
import ProjectsPage from "./components/pages/projects-page";
import HomePage from "./components/pages/home-page";
import AboutPage from "./components/pages/about-page";
import ContactPage from "./components/pages/contact-page";
import ScrollToTop from "./components/ScrollToTop";
import BackgroundSVG from "./components/BackgroundSVG";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [menuListOpen, setMenuListOpen] = useState(false);
  const location = useLocation();

  const themes = ["light", "dark", "emerald", "midnight"];

  // Sync theme with document element for global CSS access
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function handleMenuClick() {
    setMenuListOpen((prev) => !prev);
  }

  function handleToggle() {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }

  const currentPath = location.pathname === "/" ? "home" : location.pathname.substring(1);

  return (
    <div className="App">
      <ScrollToTop />
      <BackgroundSVG />
      <StaticBG current={currentPath} />
      <ScrollIndicatorStaticBars
        darkTheme={theme}
        click={handleToggle}
        menuToggle={handleMenuClick}
        menuState={menuListOpen}
      />

      <main className="main-content" key={location.key}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/apps" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<div>Error loading page</div>} />
        </Routes>
      </main>

      <References />
    </div>
  );
}

export default App;
