export default function Die(props) {
  return (
    <div className="die">
      <button
        className={props.on ? "Off" : "On"}
        onClick={() => {
          props.toggle(props.id);
        }}
        id={props.id}
      >
        {props.value}
      </button>
    </div>
  );
}
