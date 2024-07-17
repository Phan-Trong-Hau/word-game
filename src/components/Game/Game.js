import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const guessesEmpty = Array(6).fill(Array(5).fill(Array(2)));

function Game() {
  const [input, setInput] = React.useState("");
  const [guesses, setGuesses] = React.useState([]);
  const [win, setWin] = React.useState(false);
  const [lose, setLose] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = input.split("").reduce((result, value, index) => {
      if (answer.includes(value)) {
        if (value === answer[index]) {
          result = [...result, [value, "correct"]];
        } else {
          result = [...result, [value, "misplaced"]];
        }
      } else {
        result = [...result, [value, "incorrect"]];
      }

      return result;
    }, []);

    if (answer === input) setWin(true);
    if (answer !== input && guesses.length === 5) setLose(true);

    setGuesses([...guesses, result]);
    setInput("");
  };

  return (
    <>
      <div className="game-wrapper">
        <div className="guess-results">
          {guesses.map((guess) => (
            <p className="guess" key={Math.random()}>
              {guess.map((letter) => (
                <span className={`cell ${letter[1]}`} key={Math.random()}>
                  {letter[0]}
                </span>
              ))}
            </p>
          ))}
          {guessesEmpty.slice(guesses.length).map((guess) => (
            <p className="guess" key={Math.random()}>
              {guess.map(() => (
                <span className="cell" key={Math.random()}></span>
              ))}
            </p>
          ))}
        </div>

        <form className="guess-input-wrapper" onSubmit={handleSubmit}>
          <label htmlFor="guess-input">Enter guess:</label>
          <input
            id="guess-input"
            type="text"
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            value={input}
            maxLength={5}
            minLength={5}
            autoFocus
            disabled={win || lose}
          />
        </form>

        {win && (
          <div className="happy banner">
            <p>
              <strong>Congratulations!</strong> Got it in
              <strong> {guesses.length} guesses</strong>.
            </p>
          </div>
        )}

        {lose && (
          <div className="sad banner">
            <p>
              <strong>You Lose!</strong>The word to guess is
              <strong> {answer}</strong>.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Game;
