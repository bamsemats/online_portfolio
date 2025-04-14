import { useState } from "react";
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

  function enableMultiple() {
    setMultipleEnabled((prev) => !prev);
    setSelected(null);
    setMultipleSelected([]);
  }

  return (
    <div className="app-container bento-accordian">
      <span className="title-text">Single or Multiple Accordians</span>
      <div className="accordian-wrapper">
        <button
          className={`enable-button ${
            multipleEnabled ? "multiple-enabled" : ""
          }`}
          onClick={enableMultiple}
        >
          {multipleEnabled ? "Disable" : "Enable"} multiple selection
        </button>
        {data.map((object) => (
          <div
            key={object.id}
            id={object.id}
            className="accordian-container"
            onClick={() => handleClick(object.id)}
          >
            <div className="question-container">
              <span className="accordian-question">{object.question}</span>{" "}
              {selected === object.id ||
              multipleSelected.includes(object.id) ? (
                <span className="right-sign">-</span>
              ) : (
                <span className="right-sign">+</span>
              )}
            </div>
            {selected === object.id || multipleSelected.includes(object.id) ? (
              <div className="accordian-inner-container">{object.answer}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
