export default function Banner(props) {
  if (props.victory === true) {
    return (
      <div key='banner-element'className={`banner box victory ${props.lan[props.game -1]}`}><h3>GAME WON</h3><p>Congratulations! Assembly has been defeated!</p><p>Click 'New Game' to start again</p></div>
    )
  } else {
  if (props.game > 0 && props.game < 8) {
  return (
    <div key='banner-element'className={`banner box ${props.lan[props.game -1]}`}><h3>So long, {props.lan[props.game -1]}</h3><p>It has been real!</p></div>
  )} else if (props.game === 8) {
    return (
      <div key='banner-element'className={`banner box ${props.lan[props.game -1]}`}><h3>GAME OVER</h3><p>Assembly rules the world!</p><p>Click 'New Game' to start again</p></div>
    )
  } else {
    return (
      <div key='banner-element'className={`banner box invisible`}><h3>So long, {props.lan[props.game]}</h3><p>There will be two lines of text</p></div>
    )
  }}
}