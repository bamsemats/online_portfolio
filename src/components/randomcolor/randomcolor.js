import { useState, useEffect, useRef } from "react";
import Data from "./data";
import "./styles.css";

export default function RandomColor() {
  const [colorTypeHex, setColorTypeHex] = useState(false);

  const [randomHex, setRandomHex] = useState(
    "#" + Math.floor(Math.random() * 16777215).toString(16)
  );

  const [randomRGB, setRandomRGB] = useState(
    "rgb(" +
      Math.floor(Math.random() * 255) +
      ", " +
      Math.floor(Math.random() * 255) +
      ", " +
      Math.floor(Math.random() * 255) +
      ")"
  );

  const [history, setHistory] = useState([]);

  function setHex() {
    setColorTypeHex(true);
  }
  function setRGB() {
    setColorTypeHex(false);
  }
  function randomiseColor() {
    if (colorTypeHex) {
      setRandomHex("#" + Math.floor(Math.random() * 16777215).toString(16));
    } else {
      setRandomRGB(
        "rgb(" +
          Math.floor(Math.random() * 255) +
          ", " +
          Math.floor(Math.random() * 255) +
          ", " +
          Math.floor(Math.random() * 255) +
          ")"
      );
    }
  }

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setHistory((prev) => [...prev, colorTypeHex ? randomRGB : randomHex]);
      return;
    }
    setHistory((prev) => [...prev, colorTypeHex ? randomHex : randomRGB]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomRGB, randomHex]);

  function handleClick(color) {
    if (color.startsWith("#")) {
      setRandomHex(color);
      setColorTypeHex(true);
    } else {
      setRandomRGB(color);
      setColorTypeHex(false);
    }
  }

  return (
    <div className="app-container wrapper bento-random-color">
      <span className="title-text">Random Color Picker</span>
      <div
        className="randomcolor-container"
        style={{
          backgroundColor: colorTypeHex ? randomHex : randomRGB,
          boxShadow: `0px 0px 16px 1px ${colorTypeHex ? randomHex : randomRGB}`,
        }}
      >
        <div className="randomcolor-button-div">
          <button
            style={{ border: colorTypeHex ? "solid 2px var(--btn-text)" : "" }}
            className="button hex"
            onClick={setHex}
          >
            Set color to Hex
          </button>
          <button
            style={{ border: colorTypeHex ? "" : "solid 2px var(--btn-text)" }}
            className="button rgb"
            onClick={setRGB}
          >
            Set color to RGB
          </button>
          <button className="button randomise" onClick={randomiseColor}>
            Randomise a color
          </button>
        </div>
        <p>{colorTypeHex ? randomHex : randomRGB}</p>
      </div>
      <div className="history-container">
        <p className="history-title">History</p>
        {/* We need to keep the Data component usage or fix it if it's broken, but since Data was imported from './data' and likely renders the history, I'll keep the import if it's actually used below. Looking at the JSX, it IS used. */}
        <Data props={history} clicker={handleClick} />
      </div>
    </div>
  );
}
