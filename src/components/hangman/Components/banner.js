import { motion, AnimatePresence } from "framer-motion";

export default function Banner({ game, lan, victory }) {
  const isGameOver = game === 8;
  const currentLost = lan[game - 1];

  return (
    <AnimatePresence mode="wait">
      {victory ? (
        <motion.div
          key="victory"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="game-banner victory"
        >
          <h4>VICTORY!</h4>
          <p>You've saved the programming world from Assembly!</p>
        </motion.div>
      ) : isGameOver ? (
        <motion.div
          key="gameover"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="game-banner game-over"
        >
          <h4>GAME OVER</h4>
          <p>Assembly has taken over. Try again?</p>
        </motion.div>
      ) : game > 0 ? (
        <motion.div
          key={currentLost}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="game-banner alert"
        >
          <h4>Oh no!</h4>
          <p>You just lost {currentLost}!</p>
        </motion.div>
      ) : (
        <div className="game-banner placeholder">
          <p>Guess letters to protect your stack!</p>
        </div>
      )}
    </AnimatePresence>
  );
}