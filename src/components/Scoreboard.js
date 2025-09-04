"use client";

import { motion } from "framer-motion";
import { FaX, FaO, FaTrophy, FaRotateRight, FaPlay } from "react-icons/fa6";

const Scoreboard = ({
  players,
  scores,
  round,
  currentPlayer,
  onNewGame,
  onResetScores,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="gradient-border">
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Player 1 Score */}
            <motion.div
              className={`text-center p-4 rounded-xl ${
                currentPlayer === "X"
                  ? "bg-blue-500/20 ring-2 ring-blue-500"
                  : "bg-white/10 dark:bg-black/10"
              } transition-all duration-300`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaX className="text-blue-500 text-xl" />
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {players.X}
                </h3>
              </div>
              <motion.div
                key={scores.X}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-blue-500"
              >
                {scores.X}
              </motion.div>
              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                wins
              </p>
            </motion.div>

            {/* Round Info & Controls */}
            <div className="text-center space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Round {round}
                </h2>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-800 dark:text-gray-200 font-medium">
                  <FaTrophy className="text-yellow-500" />
                  <span>Draws: {scores.draws}</span>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onResetScores}
                  className="glass-button px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <FaRotateRight />
                  Reset
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNewGame}
                  className="glass-button px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <FaPlay />
                  New Game
                </motion.button>
              </div>
            </div>

            {/* Player 2 Score */}
            <motion.div
              className={`text-center p-4 rounded-xl ${
                currentPlayer === "O"
                  ? "bg-pink-500/20 ring-2 ring-pink-500"
                  : "bg-white/10 dark:bg-black/10"
              } transition-all duration-300`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaO className="text-pink-500 text-xl" />
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {players.O}
                </h3>
              </div>
              <motion.div
                key={scores.O}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-pink-500"
              >
                {scores.O}
              </motion.div>
              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                wins
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Scoreboard;
