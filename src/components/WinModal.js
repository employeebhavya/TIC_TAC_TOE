"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaHandshake, FaPlay, FaRotateRight } from "react-icons/fa6";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const WinModal = ({
  isOpen,
  winner,
  isDraw,
  players,
  onPlayAgain,
  onNewGame,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isOpen && winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, winner]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (!isOpen) return null;

  const getWinnerName = () => {
    if (isDraw) return null;
    return players[winner];
  };

  const getWinnerColor = () => {
    if (winner === "X") return "text-blue-500";
    if (winner === "O") return "text-pink-500";
    return "";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showConfetti && windowSize.width > 0 && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={200}
              gravity={0.2}
            />
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="gradient-border max-w-md w-full"
            >
              <div className="glass-card p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  {isDraw ? (
                    <FaHandshake className="mx-auto text-6xl text-yellow-500 mb-4" />
                  ) : (
                    <FaTrophy className="mx-auto text-6xl text-yellow-500 mb-4" />
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {isDraw ? (
                    <>
                      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        It&apos;s a Draw!
                      </h2>
                      <p className="text-gray-800 dark:text-gray-200 text-lg font-medium mb-6">
                        Great match! Nobody wins this round.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        🎉 Congratulations!
                      </h2>
                      <p className="text-xl font-semibold mb-2">
                        <span className={getWinnerColor()}>
                          {getWinnerName()}
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">
                          {" "}
                          wins!
                        </span>
                      </p>
                      <p className="text-gray-800 dark:text-gray-200 text-lg font-medium mb-6">
                        Excellent game! Ready for another round?
                      </p>
                    </>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onPlayAgain}
                    className="glass-button px-6 py-3 font-bold text-gray-900 dark:text-white flex items-center gap-2"
                  >
                    <FaPlay />
                    Play Again
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNewGame}
                    className="glass-button px-6 py-3 font-bold text-gray-900 dark:text-white flex items-center gap-2"
                  >
                    <FaRotateRight />
                    New Game
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WinModal;
