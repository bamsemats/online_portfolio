import { motion, AnimatePresence } from "framer-motion";

export default function Letterboxes({ word, gameOver }) {
  return (
    <div className="letter-grid">
      {word.map((letter, i) => {
        const isRevealed = letter.found || gameOver;
        const isMissing = gameOver && !letter.found;

        return (
          <div 
            key={`${letter.value}-${i}`} 
            className={`letter-slot ${isMissing ? "missing" : ""} ${letter.found ? "found" : ""}`}
          >
            <AnimatePresence mode="wait">
              {isRevealed && (
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {letter.value.toUpperCase()}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}