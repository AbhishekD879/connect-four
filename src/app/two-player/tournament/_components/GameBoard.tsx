"use client";
import React, { useState, useEffect } from "react";
import Slot from "@/app/two-player/tournament/_components/Slot";
type Player = "Player1" | "Player2" | null;

interface GameBoardProps {
  currentPlayer: Player;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>;
  onGameEnd: (winner: Player) => void;
  passUndoFunction: (undo: () => void) => void;
  whoStartsFirst: Player;
}

const GameBoard: React.FC<GameBoardProps> = ({
  currentPlayer,
  setCurrentPlayer,
  onGameEnd,
  passUndoFunction,
  whoStartsFirst,
}) => {
  const [grid, setGrid] = useState<Player[][]>(
    Array.from({ length: 6 }, () => Array(7).fill(null)),
  );
  const [history, setHistory] = useState<Player[][][]>([]);

  // Add undo functionality
  const undoMove = () => {
    if (history.length > 0) {
      setGrid(history.pop()!);
      togglePlayer();
    }
  };

  // Add reset functionality after game end
  const resetBoard = () => {
    setGrid(Array.from({ length: 6 }, () => Array(7).fill(null))); // Reset board
    setHistory([]); // Clear history for undo
    setCurrentPlayer(whoStartsFirst);
  };

  // Pass undo function to parent
  useEffect(() => {
    passUndoFunction(undoMove);
  }, [passUndoFunction]);

  const makeMove = (col: number) => {
    const newGrid = grid.map((row) => [...row]); // Deep copy of grid
    for (let row = 5; row >= 0; row--) {
      if (!newGrid[row][col]) {
        newGrid[row][col] = currentPlayer;
        setHistory([...history, grid]); // Save state in history for undo
        setGrid(newGrid);
        if (checkWinner(newGrid, row, col)) {
          onGameEnd(currentPlayer); // Call the callback function passed from parent
          resetBoard(); // Reset the board immediately after a winner is found
        } else {
          togglePlayer();
        }
        return;
      }
    }
  };

  const togglePlayer = () => {
    setCurrentPlayer((prev) => (prev === "Player1" ? "Player2" : "Player1"));
  };

  const checkWinner = (grid: Player[][], row: number, col: number): boolean => {
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal
      { dr: 1, dc: -1 }, // Anti-diagonal
    ];

    const inBounds = (r: number, c: number) =>
      r >= 0 && c >= 0 && r < 6 && c < 7;
    const player = grid[row][col];

    for (const { dr, dc } of directions) {
      let count = 1;

      for (let step = 1; step < 4; step++) {
        const r = row + dr * step,
          c = col + dc * step;
        if (inBounds(r, c) && grid[r][c] === player) count++;
        else break;
      }

      for (let step = 1; step < 4; step++) {
        const r = row - dr * step,
          c = col - dc * step;
        if (inBounds(r, c) && grid[r][c] === player) count++;
        else break;
      }

      if (count >= 4) return true;
    }
    return false;
  };
  return (
    <div>
      <div className="grid grid-cols-7 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Slot
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onClick={() => makeMove(colIndex)}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default GameBoard;
