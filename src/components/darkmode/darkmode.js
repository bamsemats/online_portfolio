import "./styles.css";
import { HiPaintBrush } from "react-icons/hi2";

export default function DarkMode({ darkTheme, click }) {
  // Mapping internal keys to display labels
  const themeLabels = {
    light: "Light",
    dark: "Dark",
    emerald: "Emerald",
    midnight: "Midnight"
  };

  return (
    <div className="darkmode-container">
      <div className="darkmode-div">
        <p className="theme-label">
          {themeLabels[darkTheme] || "Theme"}
        </p>
        <button
          className="theme-cycle-button"
          onClick={click}
          title="Cycle Themes"
        >
          <div className="theme-indicator">
            <HiPaintBrush size={10} style={{opacity: 0.9 }} />
          </div>
        </button>
      </div>
    </div>
  );
}
