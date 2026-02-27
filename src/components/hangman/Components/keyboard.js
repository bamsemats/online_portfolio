import { motion } from "framer-motion";

export default function Keyboard({ alphabet, click, guess, gameOver, victory }) {
  return (
    <div className="keyboard-grid">
      {guess.map((object) => {
        const isGuessed = object.isGuessed;
        const isCorrect = object.isCorrect;
        
        let statusClass = "";
        if (isGuessed) {
          statusClass = isCorrect ? "correct" : "incorrect";
        }

        return (
          <motion.button
            whileHover={!isGuessed && !gameOver && !victory ? { scale: 1.1 } : {}}
            whileTap={!isGuessed && !gameOver && !victory ? { scale: 0.95 } : {}}
            key={`${object.value}-key`}
            className={`key-btn ${statusClass}`}
            id={object.value}
            disabled={gameOver || victory || isGuessed}
            onClick={click}
          >
            {object.value.toUpperCase()}
          </motion.button>
        );
      })}
    </div>
  );
}