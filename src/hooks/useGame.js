"use client";

import { useState, useCallback } from "react";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

export const useGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [players, setPlayers] = useState({ X: "", O: "" });
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [round, setRound] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const checkWinner = useCallback((board) => {
    for (let combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], cells: combination };
      }
    }
    return null;
  }, []);

  const checkDraw = useCallback((board) => {
    return board.every((cell) => cell !== null);
  }, []);

  const makeMove = useCallback(
    (index) => {
      if (board[index] || isGameOver) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const winResult = checkWinner(newBoard);
      if (winResult) {
        setWinner(winResult.winner);
        setWinningCells(winResult.cells);
        setIsGameOver(true);
        setScores((prev) => ({
          ...prev,
          [winResult.winner]: prev[winResult.winner] + 1,
        }));
      } else if (checkDraw(newBoard)) {
        setIsDraw(true);
        setIsGameOver(true);
        setScores((prev) => ({
          ...prev,
          draws: prev.draws + 1,
        }));
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [board, currentPlayer, isGameOver, checkWinner, checkDraw]
  );

  const nextRound = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCells([]);
    setIsDraw(false);
    setIsGameOver(false);
    setRound((prev) => prev + 1);
  }, []);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setPlayers({ X: "", O: "" });
    setWinner(null);
    setWinningCells([]);
    setIsDraw(false);
    setIsGameOver(false);
    setRound(1);
  }, []);

  const resetScores = useCallback(() => {
    setScores({ X: 0, O: 0, draws: 0 });
    setRound(1);
  }, []);

  return {
    board,
    currentPlayer,
    players,
    scores,
    round,
    winner,
    winningCells,
    isDraw,
    isGameOver,
    makeMove,
    setPlayers,
    nextRound,
    resetGame,
    resetScores,
  };
};
