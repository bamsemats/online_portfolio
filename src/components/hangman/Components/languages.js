import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function Languages({ lan, inc }) {
  return (
    <div className="languages-flex">
      {lan.map((lang, i) => {
        const isLost = inc > i;
        
        return (
          <motion.div
            key={lang}
            animate={isLost ? { scale: 0.9, opacity: 0.6 } : { scale: 1, opacity: 1 }}
            className={`lang-pill ${isLost ? "lost" : "active"} ${lang.toLowerCase()}`}
          >
            {lang === "Node" ? "Node.js" : lang}
            {isLost && <FiX className="lost-icon" />}
          </motion.div>
        );
      })}
    </div>
  );
}
