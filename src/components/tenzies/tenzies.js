import Die from "./die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./tenzies.css";

const randomNumber = Math.ceil(Math.random() * 6);
function generateAllNewDice() {
  return new Array(10)
    .fill({
      id: 0,
      isHeld: false,
      num: 0,
    })
    .map(() => ({
      id: nanoid(),
      isHeld: false,
      num: Math.ceil(Math.random() * 6),
    }));
}

function Tenzies() {
  // randomDieNumber => array of objects. Each object needs:
  // ID, isHeld, random number. ID should not be linked
  // directly to index... Then what should it consist of?
  // isHeld is boolean - clicking the die should invert it
  // random number is generated only if the isHeld is true
  //

  const [randomDieNumber, setRandomDieNumber] = useState(() =>
    generateAllNewDice()
  );
  // console.log(randomDieNumber);
  const [dieOn, setDieOn] = useState("On");

  function rollDice() {
    setRandomDieNumber((prev) =>
      prev.map((item) =>
        item.isHeld === false
          ? {
              ...item,
              num: Math.ceil(Math.random() * 6),
            }
          : item
      )
    );
  }

  function newGame() {
    setRandomDieNumber(generateAllNewDice());
  }

  function toggleDie(id) {
    setRandomDieNumber((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isHeld: !item.isHeld,
            }
          : item
      )
    );
  }

  const gameWon =
    randomDieNumber.every((die) => die.isHeld) &&
    randomDieNumber.every((die) => die.num === randomDieNumber[0].num);

  // useEffect(() => {
  //   let completed = true;
  //   for (const element of randomDieNumber) {
  //     if (element.isHeld !== randomDieNumber[0].isHeld) {
  //       completed = false;
  //       break;
  //     } if (element.num !== randomDieNumber[0].num) {
  //       completed = false;
  //       break;
  //     }
  //     } if (completed === true) {
  //       alert('Completed');
  //   }
  // }, [randomDieNumber])

  const diceElements = randomDieNumber.map((num) => (
    <Die
      value={num.num}
      id={num.id}
      key={num.id}
      toggle={toggleDie}
      on={num.isHeld}
    />
  ));

  return (
    <div className="app-container tenzies-container bento-tenzies">
      <span className="title-text">Tenzies</span>
      <div className="tenzies-wrapper">
        <div className="tenzies-info-box">
          <h3>Tenzies Game</h3>
          <p>Roll until you get ten of the same number.</p>
          <p>Click a die to hold it.</p>
        </div>
        <div className="tenzies">{diceElements}</div>
        {gameWon && <h3>Game won!</h3>}
        <button onClick={gameWon ? newGame : rollDice} className="roll-button">
          {gameWon ? "New Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default Tenzies;
