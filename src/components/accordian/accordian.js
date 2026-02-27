import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [multipleEnabled, setMultipleEnabled] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  function handleClick(id) {
    if (multipleEnabled) {
      setMultipleSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setSelected((prev) => (prev === id ? null : id));
    }
  }

  function toggleMode() {
    setMultipleEnabled(!multipleEnabled);
    setSelected(null);
    setMultipleSelected([]);
  }

  const isSelected = (id) => 
    multipleEnabled ? multipleSelected.includes(id) : selected === id;

  return (
    <div className="lab-widget-container bento-accordian">
      <div className="widget-header-row">
        <h4 className="widget-title">Interactive Accordion</h4>
        <button
          className={`mode-toggle-btn ${multipleEnabled ? "active" : ""}`}
          onClick={toggleMode}
        >
          {multipleEnabled ? "Multi-Select On" : "Single-Select Only"}
        </button>
      </div>

      <div className="accordian-list">
        {data.map((item) => {
          const active = isSelected(item.id);
          return (
            <div
              key={item.id}
              className={`accordian-item ${active ? "active" : ""}`}
              onClick={() => handleClick(item.id)}
            >
              <div className="accordian-header">
                <span className="question">{item.question}</span>
                <span className="icon-wrapper">
                  {active ? <FiMinus /> : <FiPlus />}
                </span>
              </div>
              
              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="accordian-content-wrapper"
                  >
                    <div className="accordian-content">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
