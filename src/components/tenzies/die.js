import { motion } from "framer-motion";

export default function Die({ value, toggle, id, on }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`die-container ${on ? "held" : ""}`}
      onClick={() => toggle(id)}
    >
      <motion.span 
        key={value}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        className="die-value"
      >
        {value}
      </motion.span>
    </motion.div>
  );
}
