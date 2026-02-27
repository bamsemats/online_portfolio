import "./hangman.css";
import { useEffect, useState } from "react";
import Banner from "./Components/banner";
import Keyboard from "./Components/keyboard";
import Languages from "./Components/languages";
import Letterboxes from "./Components/letterboxes";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const LANGUAGES = [
  "HTML", "CSS", "JavaScript", "React", "TypeScript", "Node", "Python", "Ruby"
];

function HangMan() {
  const [randomWord, setRandomWord] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [guesses, setGuesses] = useState(() => generateAlphabetArray(ALPHABET));
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [isNewGameLoading, setIsNewGameLoading] = useState(false);
  const [victory, setVictory] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function generateAlphabetArray(items) {
    return items.map((item) => ({
      value: item,
      isGuessed: false,
      isCorrect: null,
    }));
  }

  async function getNewWord() {
    setIsNewGameLoading(true);
    // Reset states immediately to avoid flickering/stale states
    setGuesses(generateAlphabetArray(ALPHABET));
    setIncorrectGuesses(0);
    setVictory(false);
    setGameOver(false);

    try {
      // Using a different endpoint or specific query for better reliability
      const response = await fetch("https://random-word-api.herokuapp.com/word");
      const data = await response.json();
      const word = Array.isArray(data) ? data[0].toLowerCase() : data.toLowerCase();
      
      setRandomWord(word);
      setWordArray(word.split("").map(char => ({ value: char, found: false })));
    } catch (error) {
      console.error("Fetch error, using fallback:", error);
      const fallbacks = ["javascript", "programming", "developer", "frontend", "react", "component"];
      const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setRandomWord(fallback);
      setWordArray(fallback.split("").map(char => ({ value: char, found: false })));
    } finally {
      setIsNewGameLoading(false);
    }
  }

  useEffect(() => {
    getNewWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function makeGuess(event) {
    const letter = event.target.id;
    if (!letter || victory || gameOver) return;

    const isCorrect = randomWord.includes(letter);
    
    setGuesses(prev => prev.map(g => 
      g.value === letter ? { ...g, isGuessed: true, isCorrect } : g
    ));

    if (isCorrect) {
      setWordArray(prev => prev.map(char => 
        char.value === letter ? { ...char, found: true } : char
      ));
    } else {
      setIncorrectGuesses(prev => prev + 1);
    }
  }

  useEffect(() => {
    if (incorrectGuesses >= LANGUAGES.length) {
      setGameOver(true);
    }
  }, [incorrectGuesses]);

  useEffect(() => {
    if (wordArray.length > 0 && wordArray.every(char => char.found)) {
      setVictory(true);
    }
  }, [wordArray]);

  return (
    <div className="lab-widget-container bento-hangman">
      <div className="widget-header-row">
        <h4 className="widget-title">Assembly Endgame</h4>
        <button 
          className="reset-btn" 
          onClick={getNewWord}
          disabled={isNewGameLoading}
        >
          {isNewGameLoading ? "Loading..." : "New Game"}
        </button>
      </div>

      <div className="hangman-game-layout">
        <Banner game={incorrectGuesses} lan={LANGUAGES} victory={victory} />
        
        <div className="languages-track">
          <p className="label">Stack at Risk</p>
          <Languages lan={LANGUAGES} inc={incorrectGuesses} />
        </div>

        <div className="word-reveal-area">
          <Letterboxes word={wordArray} gameOver={gameOver} />
        </div>

        <div className="interaction-area">
          <Keyboard 
            alphabet={ALPHABET} 
            click={makeGuess} 
            guess={guesses} 
            gameOver={gameOver}
            victory={victory}
          />
        </div>
      </div>
    </div>
  );
}

export default HangMan;
