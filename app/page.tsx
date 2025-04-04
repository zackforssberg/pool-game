"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const generateUniqueNumbers = (
  numPlayers: number,
  numbersPerPlayer: number
) => {
  const poolBalls = Array.from({ length: 15 }, (_, i) => i + 1); // Pool balls from 1 to 15
  const shuffled = poolBalls.sort(() => Math.random() - 0.5);
  const playerNumbers: number[][] = [];

  for (let i = 0; i < numPlayers; i++) {
    playerNumbers.push(shuffled.splice(0, numbersPerPlayer));
  }

  return playerNumbers;
};

export default function PoolGame() {
  const [numPlayers, setNumPlayers] = useState<number>(3); // Default 3 players
  const [numbersPerPlayer, setNumbersPerPlayer] = useState<number | null>(3); // Default 3 balls per player
  const [playerNumbers, setPlayerNumbers] = useState<number[][] | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [numbersRevealed, setNumbersRevealed] = useState<boolean>(false);

  const handleGenerateNumbers = () => {
    if (numPlayers && numbersPerPlayer) {
      const generatedNumbers = generateUniqueNumbers(
        numPlayers,
        numbersPerPlayer
      );
      setPlayerNumbers(generatedNumbers);
      setCurrentPlayer(0); // Start with the first player
      setNumbersRevealed(false); // Reset to hide numbers initially
    }
  };

  const handleNextPlayer = () => {
    if (currentPlayer !== null && currentPlayer < (numPlayers ?? 0) - 1) {
      setCurrentPlayer(currentPlayer + 1);
      setNumbersRevealed(false); // Hide numbers before the next player can view
    } else {
      // Reset game state
      setCurrentPlayer(null);
      setPlayerNumbers(null);
      setNumbersRevealed(false); // Hide numbers for the new round
    }
  };

  const handleShowNumbers = () => {
    if (currentPlayer !== null && playerNumbers) {
      setNumbersRevealed(true);
    }
  };

  const increasePlayers = () => {
    if (numPlayers < 10) {
      setNumPlayers(numPlayers + 1);
      adjustBallsPerPlayer(numPlayers + 1);
    }
  };

  const decreasePlayers = () => {
    if (numPlayers > 2) {
      setNumPlayers(numPlayers - 1);
      adjustBallsPerPlayer(numPlayers - 1);
    }
  };

  // Function to adjust balls per player based on number of players
  const adjustBallsPerPlayer = (newNumPlayers: number) => {
    if (numbersPerPlayer && newNumPlayers * numbersPerPlayer > 15) {
      const maxBallsPerPlayer = Math.floor(15 / newNumPlayers);
      setNumbersPerPlayer(maxBallsPerPlayer); // Adjust to the maximum possible
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Last Ball Standing</h1>
      <Link className="mb-4" href="/rules">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
          How to play
        </button>
      </Link>

      <h2 className="text-xl font-bold mb-4">Select number of players</h2>
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={decreasePlayers}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          -
        </button>
        <span className="text-lg font-bold">{numPlayers}</span>
        <button
          onClick={increasePlayers}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          +
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Select numbers per player</h2>
      <div className="flex space-x-4 mb-6">
        {[1, 2, 3, 4, 5].map((numbers) => (
          <button
            key={numbers}
            onClick={() => setNumbersPerPlayer(numbers)}
            disabled={numPlayers * numbers > 15} // Disable if the total exceeds 15 balls
            className={`px-4 py-2 text-white rounded-md ${
              numPlayers * numbers > 15
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } ${numbersPerPlayer === numbers ? "ring-4 ring-blue-300" : ""}`}
          >
            {numbers}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerateNumbers}
        disabled={numbersPerPlayer === null || playerNumbers !== null}
        className="px-4 py-2 mb-4 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate Numbers
      </button>

      {playerNumbers && currentPlayer !== null && (
        <div className="p-4 rounded-md bg-secondary shadow-md mb-4">
          <h2 className="text-lg font-bold mb-2">
            Player {currentPlayer + 1}&apos;s Numbers:
          </h2>
          {numbersRevealed ? (
            <div className="flex justify-center space-x-2">
              {playerNumbers[currentPlayer].map((num) => (
                <Image
                  key={num}
                  // src={`/images/png-images/ball${num}.png`} // Use ball images from public folder
                  src={`/images/avif-images/ball${num}.avif`} // Use ball images from public folder
                  alt={`Ball ${num}`}
                  height={48}
                  width={48}
                  className="w-12 h-12" // Adjust the size of the images
                />
              ))}
            </div>
          ) : (
            <p className="text-xl font-mono text-center">----</p> // Placeholder when numbers are hidden
          )}
        </div>
      )}
      {numbersPerPlayer === null ||
        (playerNumbers !== null && (
          <div className="flex space-x-4 mb-6">
            {numbersRevealed ? (
              <button
                onClick={handleNextPlayer}
                className={`px-4 py-2 text-white rounded-md ${
                  currentPlayer === (numPlayers ?? 0) - 1
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {currentPlayer === (numPlayers ?? 0) - 1
                  ? "Start Over"
                  : "Next Player"}
              </button>
            ) : (
              <button
                onClick={handleShowNumbers}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Show Numbers
              </button>
            )}
          </div>
        ))}
      <p className="mt-40">Created by Zack Forssberg</p>
    </div>
  );
}
