export default function Data({props, clicker}) {
  if (props.length > 0) {
    return (
    <div className="history-div" key="history-div">
      {props.map(item => 
        <span 
        key={item}
        id={item} 
        className="history-item"
        onClick={() => clicker(item)}
        >{item}</span>
      )}
    </div>
  )
} else return null;
};