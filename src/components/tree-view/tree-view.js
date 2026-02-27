import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFolder, FiFile, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { data } from "./data";
import "./styles.css";

const TreeItem = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.content && Array.isArray(item.content);

  return (
    <div className="tree-item-wrapper" style={{ marginLeft: depth > 0 ? "1.5rem" : "0" }}>
      <motion.div 
        className={`tree-node ${hasChildren ? "parent" : "leaf"} ${isOpen ? "open" : ""}`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        whileHover={{ x: 4 }}
      >
        <div className="node-content">
          <span className="node-icon">
            {hasChildren ? (
              isOpen ? <FiChevronDown /> : <FiChevronRight />
            ) : (
              <FiFile className="file-icon" />
            )}
          </span>
          {hasChildren && <FiFolder className={`folder-icon ${isOpen ? "open" : ""}`} />}
          <span className="node-label">{item.name}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="tree-children"
          >
            {item.content.map((child, idx) => (
              <TreeItem key={`${child.name}-${idx}`} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TreeView() {
  return (
    <div className="lab-widget-container bento-tree-view">
      <div className="widget-header-row">
        <h4 className="widget-title">Recursive Structure Explorer</h4>
        <div className="status-pill">JSON Driven</div>
      </div>

      <div className="tree-explorer-surface">
        <div className="explorer-header">
          <div className="explorer-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="explorer-title">root_directory</span>
        </div>
        <div className="tree-content">
          {data.map((item, idx) => (
            <TreeItem key={`${item.name}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// {data.map(item => {
//   if (item.content === null) {
//     return (
//     <p>{item.name}</p>
//   )} else {
//     console.log(item)
//     return (
//       <div>
//         <p>{item.name}</p>
//         {item.content.map(content => {
//           if (content.content === null) {
//           return (
//            <p>{content.name}</p>
//           )} else {
//             return (
//               <div>
//                 <p>{content.name}</p>
//                 {content.content.map(content => {
//                   if (content.content === null) {
//                     return (
//                       <p>{content.name}</p>
//                     )
//                   } else {
//                     return (
//                       <div>
//                         <p>{content.name}</p>
//                         {content.content.map(content => {
//                           <p>{content.name}</p>
//                         }
//                         )}
//                       </div>
//                     )
//                   }
//                 }
//                 )}
//               </div>
//             )
//           }
//         })}
//       </div>
//     )
//   }
// })}
