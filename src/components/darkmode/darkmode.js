import { useState, useEffect, useRef } from "react";
import useLocalStorage from "./useLocalStorage";
import "./styles.css";
import { FaCircle } from "react-icons/fa";

export default function DarkMode({ darkTheme, click }) {
  // const [theme, setTheme] = useLocalStorage("theme", "dark");

  // function handleToggle() {
  //   setTheme(theme === "light" ? "dark" : "light");
  // }

  return (
    <div className="darkmode-container">
      {/* <span className="title-text">DarkMode</span> */}
      <div className="darkmode-div">
        <p>
          Darkmode
          {/* : {darkTheme === "dark" ? "ON" : "OFF"} */}
        </p>
        <button
          className="darkmode-button"
          style={{
            justifyContent: darkTheme === "dark" ? "flex-start" : "flex-end",
          }}
          onClick={click}
        >
          <FaCircle
            fill={"var(--btn-text)"}
            style={{
              fill: "var(--btn-text)",
            }}
          />
        </button>
      </div>
    </div>
  );
}
