import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import Die from "./die";
import "./tenzies.css";

function generateAllNewDice() {
  return Array.from({ length: 10 }, () => ({
    id: nanoid(),
    isHeld: false,
    num: Math.ceil(Math.random() * 6),
  }));
}

export default function Tenzies() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [timer, setTimer] = useState(0);
  const timerInterval = useRef(null);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].num;
    const allSameValue = dice.every((die) => die.num === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      clearInterval(timerInterval.current);
    }
  }, [dice]);

  useEffect(() => {
    if (rolls > 0 && !tenzies && !timerInterval.current) {
      timerInterval.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval.current);
  }, [rolls, tenzies]);

  function rollDice() {
    if (!tenzies) {
      setRolls((prev) => prev + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, num: Math.ceil(Math.random() * 6) };
        })
      );
    } else {
      setTenzies(false);
      setDice(generateAllNewDice());
      setRolls(0);
      setTimer(0);
      timerInterval.current = null;
    }
  }

  function toggleDie(id) {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
      if (rolls === 0) setRolls(1);
    }
  }

  return (
    <div className="lab-widget-container bento-tenzies">
      <div className="widget-header-row">
        <h4 className="widget-title">Tenzies Game</h4>
        <div className="stats-row">
          <div className="stat-pill">Rolls: <span>{rolls}</span></div>
          <div className="stat-pill">Time: <span>{timer}s</span></div>
        </div>
      </div>

      <div className="tenzies-board">
        <div className="dice-grid">
          {dice.map((die) => (
            <Die
              key={die.id}
              id={die.id}
              value={die.num}
              on={die.isHeld}
              toggle={toggleDie}
            />
          ))}
        </div>

        <AnimatePresence>
          {tenzies && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="win-overlay"
            >
              <h3>You Won!</h3>
              <p>Completed in {rolls} rolls and {timer} seconds.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          className={`roll-btn ${tenzies ? "win" : ""}`} 
          onClick={rollDice}
        >
          {tenzies ? "New Game" : "Roll Dice"}
        </button>
      </div>
    </div>
  );
}
