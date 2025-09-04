"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameBoard from "@/components/GameBoard";
import PlayerSetup from "@/components/PlayerSetup";
import Scoreboard from "@/components/Scoreboard";
import WinModal from "@/components/WinModal";
import ThemeToggle from "@/components/ThemeToggle";
import { useGame } from "@/hooks/useGame";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const {
    board,
    currentPlayer,
    players,
    scores,
    round,
    winner,
    isDraw,
    isGameOver,
    makeMove,
    setPlayers,
    nextRound,
    resetGame,
    resetScores,
  } = useGame();

  const handlePlayersSet = (playerNames) => {
    setPlayers(playerNames);
    setGameStarted(true);
  };

  const handleNewGame = () => {
    resetGame();
    setGameStarted(false);
  };

  const handlePlayAgain = () => {
    nextRound();
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <ThemeToggle />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Modern Tic Tac Toe
          </h1>
          <p className="text-gray-800 dark:text-gray-100 text-xl font-medium">
            Experience the classic game with modern animations
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!gameStarted ? (
            <PlayerSetup key="setup" onPlayersSet={handlePlayersSet} />
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8"
            >
              <Scoreboard
                players={players}
                scores={scores}
                round={round}
                currentPlayer={currentPlayer}
                onNewGame={handleNewGame}
                onResetScores={resetScores}
              />

              <GameBoard
                board={board}
                onCellClick={makeMove}
                isGameOver={isGameOver}
                winner={winner}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <WinModal
          isOpen={isGameOver}
          winner={winner}
          isDraw={isDraw}
          players={players}
          onPlayAgain={handlePlayAgain}
          onNewGame={handleNewGame}
        />
      </div>
    </div>
  );
}
