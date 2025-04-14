export default function SelectorButton(props) {
  function capFirst(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <button
      className={`selector-${props.name}`}
      onClick={() => {
        props.onClick(props.name);
      }}
    >
      {capFirst(props.name)}
    </button>
  );
}
