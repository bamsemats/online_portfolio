import { NavLink } from "react-router-dom";

export default function SelectorButton(props) {
  function capFirst(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  const path = props.name === "home" ? "/" : `/${props.name}`;

  return (
    <NavLink
      to={path}
      className={({ isActive }) => 
        `selector-${props.name} ${isActive ? 'active' : ''}`
      }
      onClick={props.onClick}
    >
      {capFirst(props.name)}
    </NavLink>
  );
}
