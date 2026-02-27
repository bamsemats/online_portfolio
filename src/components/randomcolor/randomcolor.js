import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiCopy, FiCheck } from "react-icons/fi";
import "./styles.css";

export default function RandomColor() {
  const [type, setType] = useState("hex");
  const [color, setColor] = useState("#23c686");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  function generateRandomColor() {
    let newColor;
    if (type === "hex") {
      newColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    } else {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      newColor = `rgb(${r}, ${g}, ${b})`;
    }
    setColor(newColor);
    setHistory(prev => [newColor, ...prev.slice(0, 7)]);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generateRandomColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="lab-widget-container bento-random-color">
      <div className="widget-header-row">
        <h4 className="widget-title">Procedural Color Engine</h4>
        <div className="type-toggle">
          <button 
            className={`mode-btn ${type === "hex" ? "active" : ""}`}
            onClick={() => setType("hex")}
          >
            HEX
          </button>
          <button 
            className={`mode-btn ${type === "rgb" ? "active" : ""}`}
            onClick={() => setType("rgb")}
          >
            RGB
          </button>
        </div>
      </div>

      <div className="color-display-card">
        <motion.div 
          className="color-preview"
          animate={{ backgroundColor: color }}
          transition={{ duration: 0.5 }}
        >
          <div className="color-value-overlay">
            <h2>{color}</h2>
            <div className="action-buttons">
              <button className="icon-action-btn" onClick={generateRandomColor}>
                <FiRefreshCw />
              </button>
              <button className="icon-action-btn" onClick={copyToClipboard}>
                {copied ? <FiCheck color="#4ade80" /> : <FiCopy />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="history-section">
        <p className="label">Recent Palettes</p>
        <div className="history-grid">
          <AnimatePresence>
            {history.map((hColor, idx) => (
              <motion.div
                key={`${hColor}-${idx}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="history-swatch"
                style={{ backgroundColor: hColor }}
                onClick={() => setColor(hColor)}
                title={hColor}
                whileHover={{ y: -4 }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
