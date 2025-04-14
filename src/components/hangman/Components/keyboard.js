export default function Keyboard(props) {
  return (
    props.guess.map((object) => {
      const styles = {
        background: object.isCorrect === null 
        ? 'linear-gradient(135deg, #ffea00, #fcf27c)' 
        : object.isCorrect 
        ? 'linear-gradient(135deg,rgb(17, 255, 0),rgb(128, 252, 124))' 
        : 'linear-gradient(135deg,rgb(255, 34, 0),rgb(252, 137, 124))',
        opacity: props.gameOver && 0.5};
      return (
        <div 
        style={styles}
        key={`${object.value}-key`} 
        className={`key ${object.value}`}
        id={object.value}
        disabled={props.gameOver}
        onClick={object.isCorrect !== false ? props.click: null}>
          {object.value.toUpperCase()}
          </div>
      )
    })
  )
}