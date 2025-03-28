import { useState, useEffect } from "react";

const words = ["react", "vite", "javascript", "hangman", "frontend"];

export default function Hangman() {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const handleGuess = (letter) => {
    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
    setGuessedLetters(new Set([...guessedLetters, letter]));
  };

  const resetGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
  };

  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
    .join(" ");

  const isGameOver = wrongGuesses >= 6;
  const isGameWon = displayWord.replace(/ /g, "") === word;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md border border-gray-300 rounded-lg p-6 shadow-md bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Hangman</h2>
        <p className="text-2xl tracking-wider">{displayWord}</p>
        <p className="text-red-500 mt-2">Wrong guesses: {wrongGuesses}/6</p>

        {isGameOver && (
          <p className="text-red-600 mt-4 text-xl font-semibold">
            Game Over! The word was: <span className="underline">{word}</span>
          </p>
        )}
        {isGameWon && (
          <p className="text-green-600 mt-4 text-xl font-semibold">
            You Win! 🎉
          </p>
        )}

        <button
          onClick={resetGame}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Restart Game
        </button>
      </div>

      <div className="grid grid-cols-9 gap-2 mt-8">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <button
            key={letter}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
            disabled={guessedLetters.has(letter) || isGameOver || isGameWon}
            onClick={() => handleGuess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
