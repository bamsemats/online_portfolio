import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiCopy, FiCheck, FiX } from 'react-icons/fi';

const THEME_VARIABLES = [
  '--bg-main',
  '--bg-panel',
  '--text-heading',
  '--text-body',
  '--text-link',
  '--text-body-two',
  '--btn-bg',
  '--btn-text',
  '--border-subtle',
  '--token-color'
];

export default function ThemeExporter() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getThemeData = () => {
    const rootStyle = getComputedStyle(document.documentElement);
    return THEME_VARIABLES.reduce((acc, variable) => {
      acc[variable] = rootStyle.getPropertyValue(variable).trim();
      return acc;
    }, {});
  };

  const copyToClipboard = () => {
    const data = getThemeData();
    const cssString = `:root {\n${Object.entries(data)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')}\n}`;
    
    navigator.clipboard.writeText(cssString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themeData = isOpen ? getThemeData() : {};

  return (
    <div className="theme-exporter-wrapper">
      <button 
        className="exporter-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Export Theme CSS"
      >
        <FiDownload size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="exporter-modal"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
          >
            <div className="exporter-header">
              <h5>Theme CSS Tokens</h5>
              <button className="close-btn" onClick={() => setIsOpen(false)}><FiX /></button>
            </div>
            
            <div className="exporter-body">
              <pre className="css-preview">
                {Object.entries(themeData).map(([key, value]) => (
                  <div key={key} className="css-line">
                    <span className="css-key">{key}</span>: 
                    <span className="css-value"> {value}</span>;
                    <span className="color-preview-swatch" style={{ backgroundColor: value }}></span>
                  </div>
                ))}
              </pre>
            </div>

            <div className="exporter-footer">
              <button className="copy-btn" onClick={copyToClipboard}>
                {copied ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy CSS</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
