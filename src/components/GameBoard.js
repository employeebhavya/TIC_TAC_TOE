"use client";

import { motion } from "framer-motion";
import { FaX, FaO } from "react-icons/fa6";

const GameBoard = ({ board, onCellClick, isGameOver, winner }) => {
  const getCellContent = (value, index) => {
    if (!value) return null;

    const Icon = value === "X" ? FaX : FaO;
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
        className={`text-5xl md:text-6xl ${
          value === "X" ? "text-blue-500" : "text-pink-500"
        } drop-shadow-lg`}
      >
        <Icon />
      </motion.div>
    );
  };

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-border"
      >
        <div className="glass-card p-6">
          <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
            {board.map((cell, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCellClick(index)}
                disabled={cell !== null || isGameOver}
                className={`
                  w-24 h-24 md:w-28 md:h-28 glass-card
                  flex items-center justify-center
                  transition-all duration-200
                  border-2 border-white/30 dark:border-white/20
                  ${
                    !cell && !isGameOver
                      ? "cell-hover cursor-pointer"
                      : "cursor-not-allowed"
                  }
                  ${cell ? "bg-white/30 dark:bg-black/30 shadow-inner" : ""}
                `}
              >
                {getCellContent(cell, index)}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameBoard;
