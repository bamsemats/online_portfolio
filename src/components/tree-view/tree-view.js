import { useState, useEffect, useRef } from "react";
import { data } from "./data";
import "./styles.css";

export default function TreeView() {
  const [expandChild, setExpandChild] = useState({});

  function renderData(data, parentPath = "") {
    return data.map((item) => {
      const path = parentPath ? `${parentPath}/${item.name}` : item.name;

      return (
        <div key={path} className="menu-item">
          <div className="menu-parent">
            <p onClick={() => handleClick(path)}>{item.name}</p>
            {item.content && (
              <button
                className="expand-button"
                onClick={() => handleClick(path)}
              >
                {expandChild[path] ? "-" : "+"}
              </button>
            )}
          </div>
          {item.content && Array.isArray(item.content) && expandChild[path] && (
            <div className="menu-child">{renderData(item.content, path)}</div>
          )}
        </div>
      );
    });
  }

  function handleClick(path) {
    setExpandChild((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  }

  /*
  expandChild is an object (?) that contains keys representing each rendered element. When user clicks the expand button, the object has a key added with a boolean value (true/false). If the key exists, it toggles the boolean value. Child items in each element are set to be shown also and ONLY if expandChild's containing object has a key value of true correlating to the element's name (i.e. item.name).
  */

  return (
    <div className="app-container bento-tree-view">
      <span className="title-text">Recursive Tree View Menu</span>
      <div className="tree-view-container">{renderData(data)}</div>
    </div>
  );
}

{
  /* <div className="tree-view-div">
<p>
  Home
</p>
<button 
className="expand-button">
  +
</button>
<div className="profile-div">
<p>
  Profile
</p>
<button 
className="expand-button">
  +
</button>
</div>
<div className="settings-div">
<p>
  Settings
</p>
<button 
className="expand-button">
  +
</button>
</div>
</div> */
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
