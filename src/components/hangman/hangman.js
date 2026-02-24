import "./hangman.css";
import { useEffect, useState } from "react";
import Banner from "./Components/banner";
import Keyboard from "./Components/keyboard";
import Languages from "./Components/languages";
import Letterboxes from "./Components/letterboxes";
import Button from "./Components/button";

function HangMan() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const [randomWord, setRandomWord] = useState("");
  const [wordArray, setWordArray] = useState(wordToArray(randomWord));
  const [guesses, setGuesses] = useState(() => generateAlphabetArray(alphabet));
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [aNewGame, setANewGame] = useState(false);
  const [victory, setVictory] = useState(false);

  const languages = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "TypeScript",
    "Node",
    "Python",
    "Ruby",
    "Assembly",
  ];

  function wordToArray(word) {
    const array = word.split("");
    const result = array.map((letter) => ({
      value: letter,
      found: false,
    }));
    return result;
  }

  function generateAlphabetArray(item) {
    return item.map((prev) => ({
      value: prev,
      isGuessed: false,
      isCorrect: null,
    }));
  }

  async function fetchWord() {
    try {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }
      const data = await response.json();
      // console.log('API Response', data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  useEffect(() => {
    async function getWord() {
      const data = await fetchWord();

      if (data) {
        console.log("Fetched word:", data);
        setRandomWord(data[0]);
        console.log(randomWord);
      } else {
        console.log("No data received. The API might be down.");
      }
    }
    getWord();
  }, [aNewGame]);

  // useEffect(() => {
  //   console.log("Current state of guesses:", guesses);
  // }, [guesses]);

  useEffect(() => {
    incorrectGuesses === 8 ? setGameOver(true) : setGameOver(false);
  }, [incorrectGuesses]);

  function makeGuess(event) {
    const newGuesses = guesses.map((prev) => {
      if (prev.value === event.target.id && randomWord.includes(prev.value)) {
        return {
          ...prev,
          isGuessed: true,
          isCorrect: true,
        };
      } else if (
        prev.value === event.target.id &&
        !randomWord.includes(prev.value)
      ) {
        setIncorrectGuesses((prev) => prev + 1);
        return {
          ...prev,
          isGuessed: true,
          isCorrect: false,
        };
      } else {
        return {
          ...prev,
        };
      }
    });
    setGuesses(newGuesses);
    const newLetter = wordArray.map((prev) => {
      if (prev.value === event.target.id) {
        return {
          ...prev,
          found: true,
        };
      } else {
        return {
          ...prev,
        };
      }
    });
    setWordArray(newLetter);
  }

  useEffect(() => {
    const result = wordArray.map((object) => object.found);

    if (result.length > 1) {
      console.log(result);
    } else return;

    if (!result.includes(false) && result.length > 1) {
      setVictory(true);
    } else {
      return; // console.log('nay');
    }
  }, [guesses]);

  useEffect(() => {
    console.log("Victory Changed", victory);
  }, [victory]);

  function newGame() {
    setIncorrectGuesses(0);
    setANewGame((prev) => !prev);
    setGuesses(() => generateAlphabetArray(alphabet));
    setVictory(false);
    setWordArray([]);
  }

  useEffect(() => {
    setWordArray(wordToArray(randomWord));
  }, [randomWord]);

  return (
    <div className="app-container hangman-wrapper bento-hangman">
      <span className="title-text">Hangman</span>
      <div className="hangman-container">
        <div className="title box">
          <h3>Assembly: Endgame</h3>
          <p>
            Guess the word in under eight attempts to keep the programming world
            safe from Assembly!
          </p>
        </div>
        <Banner game={incorrectGuesses} lan={languages} victory={victory} />
        <div className="code-collection box">
          <Languages lan={languages} inc={incorrectGuesses} />
        </div>
        <div className="letter-boxes box">
          <Letterboxes word={wordArray} gameOver={gameOver} />
        </div>
        <div className="keyboard box">
          <Keyboard
            alphabet={alphabet}
            click={gameOver ? null : victory ? null : makeGuess}
            guess={guesses}
            gameOver={gameOver}
          />
        </div>
        <div className="new-game box">
          <Button click={newGame} />
        </div>
      </div>
    </div>
  );
}

export default HangMan;
