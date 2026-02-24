export default function Letterboxes(props) {
  return (
    props.word.map((letter, i) => {
      return (
        <div key={`${letter.value} on ${i}`} className={`letter ${i} ${props.gameOver && !letter.found ? 'missing-letter' : ''}`}>{letter.found ? letter.value.toUpperCase() : props.gameOver && !letter.found ? letter.value.toUpperCase() : ''}</div>
      )
    })
  )
}