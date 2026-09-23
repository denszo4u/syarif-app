import { useState, useEffect } from "react";
import { Gamepad2, RotateCcw, Trophy } from "lucide-react";

type Board = (string | null)[];

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function AestheticGame() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState({ player: 0, ai: 0 });

  const checkWinner = (b: Board) => {
    for (const [a, c, d] of WINNING_COMBOS) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    }
    if (b.every((cell) => cell !== null)) return "Tie";
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleEndGame(result);
    } else {
      setIsPlayerTurn(false);
    }
  };

  // Simple AI Move
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((v): v is number => v !== null);

        if (emptyIndices.length > 0) {
          const aiMove =
            emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[aiMove] = "O";
          setBoard(newBoard);

          const result = checkWinner(newBoard);
          if (result) {
            handleEndGame(result);
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board]);

  const handleEndGame = (res: string) => {
    setWinner(res);
    if (res === "X") setScore((prev) => ({ ...prev, player: prev.player + 1 }));
    if (res === "O") setScore((prev) => ({ ...prev, ai: prev.ai + 1 }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      {/* Header */}
      <div className="w-full flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-semibold">
          <Gamepad2 className="h-3.5 w-3.5 text-purple-400" />
          Tic-Tac-Toe
        </span>
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="text-indigo-300">You: {score.player}</span>
          <span className="text-slate-600">|</span>
          <span className="text-pink-300">AI: {score.ai}</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[210px] aspect-square py-1">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className={`flex items-center justify-center rounded-xl font-bold text-lg transition-all duration-200 border ${
              cell === "X"
                ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                : cell === "O"
                  ? "bg-pink-500/20 text-pink-300 border-pink-500/40"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95"
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Status & Reset Bar */}
      <div className="w-full flex items-center justify-between pt-1 text-xs">
        <span className="text-slate-300 font-medium text-[11px]">
          {winner
            ? winner === "Tie"
              ? "It's a Draw!"
              : winner === "X"
                ? "You Won! 🎉"
                : "AI Won! 🤖"
            : isPlayerTurn
              ? "Your turn (X)"
              : "AI thinking..."}
        </span>

        <button
          onClick={resetGame}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
          title="Restart Game"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
