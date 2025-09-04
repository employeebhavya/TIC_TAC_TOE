"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaX, FaO, FaPlay } from "react-icons/fa6";

const PlayerSetup = ({ onPlayersSet }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!player1.trim()) {
      newErrors.player1 = "Player 1 name is required";
    }
    if (!player2.trim()) {
      newErrors.player2 = "Player 2 name is required";
    }
    if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
      newErrors.player2 = "Player names must be different";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onPlayersSet({
        X: player1.trim(),
        O: player2.trim(),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto"
    >
      <div className="gradient-border">
        <div className="glass-card p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Enter Player Names
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <div className="flex items-center gap-2">
                      <FaX className="text-blue-500" />
                      Player 1 (X)
                    </div>
                  </label>
                  <input
                    type="text"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                    className={`
                      w-full px-4 py-3 rounded-lg glass-card
                      text-gray-800 dark:text-white
                      placeholder-gray-500 dark:placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-all duration-200
                      ${errors.player1 ? "ring-2 ring-red-500" : ""}
                    `}
                    placeholder="Enter first player name"
                  />
                  {errors.player1 && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.player1}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <div className="flex items-center gap-2">
                      <FaO className="text-pink-500" />
                      Player 2 (O)
                    </div>
                  </label>
                  <input
                    type="text"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    className={`
                      w-full px-4 py-3 rounded-lg glass-card
                      text-gray-800 dark:text-white
                      placeholder-gray-500 dark:placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-pink-500
                      transition-all duration-200
                      ${errors.player2 ? "ring-2 ring-red-500" : ""}
                    `}
                    placeholder="Enter second player name"
                  />
                  {errors.player2 && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.player2}
                    </motion.p>
                  )}
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full glass-button py-4 px-6 font-bold text-gray-900 dark:text-white text-lg flex items-center justify-center gap-2"
              >
                <FaPlay />
                Start Game
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerSetup;
