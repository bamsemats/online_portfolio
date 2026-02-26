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
    if (theme === 'custom') {
      const customColors = JSON.parse(localStorage.getItem('custom-theme-colors'));
      if (customColors) {
        Object.entries(customColors).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
        document.documentElement.setAttribute('data-theme', 'custom');
        return;
      }
    }
    
    // Clear custom styles when switching back to presets
    document.documentElement.removeAttribute('style');
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const generateRandomTheme = () => {
    const hue = Math.floor(Math.random() * 360);
    
    // Procedural generation based on HSL
    const colors = {
      '--bg-main': `hsl(${hue}, 30%, 5%)`,
      '--bg-panel': `hsl(${hue}, 25%, 8%)`,
      '--bg-panel-rgb': '15, 23, 42', // Placeholder or dynamic if needed
      '--text-heading': `hsl(${hue}, 10%, 95%)`,
      '--text-body': `hsl(${hue}, 10%, 75%)`,
      '--text-link': `hsl(${hue}, 80%, 60%)`,
      '--text-body-two': `hsl(${(hue + 40) % 360}, 70%, 60%)`,
      '--btn-bg': `hsl(${hue}, 80%, 60%)`,
      '--btn-text': `hsl(${hue}, 30%, 5%)`,
      '--border-subtle': `hsla(${hue}, 10%, 100%, 0.1)`,
      '--token-color': `hsl(${hue}, 80%, 60%)`,
      '--theme-id': Date.now() // Force a change even if hue is same
    };

    localStorage.setItem('custom-theme-colors', JSON.stringify(colors));
    
    // Force a re-trigger if already custom by temporarily setting to something else or just toggling a signal
    if (theme === 'custom') {
      setTheme('custom-sync'); // Temporary state to trigger useEffect
      setTimeout(() => setTheme('custom'), 10);
    } else {
      setTheme('custom');
    }
  };

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
        onRandomize={generateRandomTheme}
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
