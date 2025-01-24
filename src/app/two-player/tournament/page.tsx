"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSettingsContext } from "@/lib/context/ConfigureContext";
import { WhoStarts } from "@/app/two-player/_components/WhoStartsDropDown";
import GameBoard from "@/app/two-player/tournament/_components/GameBoard";
import PlayerCard from "@/app/two-player/tournament/_components/PlayerCard";

type Player = "Player1" | "Player2" | null;

const TournamentManager = () => {
  const { state } = useSettingsContext();
  const [scores, setScores] = useState({ Player1: 0, Player2: 0 });
  const [currentGame, setCurrentGame] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("Player1");
  const [previousWinner, setPreviousWinner] = useState<Player>(null);
  const [tournamentWinner, setTournamentWinner] = useState<string | null>(null); // Track the tournament winner
  const whoStartFirst = useRef<Player>(null);
  const undoRef = useRef<() => void>(() => {});

  useEffect(() => {
    switch (state.whoStarts) {
      case WhoStarts.PLAYER_1:
        setCurrentPlayer("Player1");
        break;
      case WhoStarts.PLAYER_2:
        setCurrentPlayer("Player2");
        break;
      case WhoStarts.ALTERNATIVE:
        setCurrentPlayer(currentGame % 2 === 0 ? "Player2" : "Player1");
        break;
      case WhoStarts.WINNER_FIRST:
        setCurrentPlayer(previousWinner || "Player1");
        break;
      case WhoStarts.LOSER_FIRST:
        setCurrentPlayer(previousWinner === "Player1" ? "Player2" : "Player1");
        break;
      default:
        setCurrentPlayer("Player1");
    }
    whoStartFirst.current = currentPlayer;
  }, [currentGame, state.whoStarts, previousWinner]);


  const handleGameEnd = (winner: Player) => {
    let newScores = { ...scores };

    if (winner) {
      newScores[winner] += 1;
      setScores(newScores);
      setPreviousWinner(winner);
    }

    if (currentGame === state.numberOfGames) {
      let resultMessage = "";
      if (newScores.Player1 > newScores.Player2) {
        resultMessage = `Player1 wins the tournament!`;
        setTournamentWinner(`Congratulations, ${state.player1}, You won!`);
      } else if (newScores.Player2 > newScores.Player1) {
        resultMessage = `Player2 wins the tournament!`;
        setTournamentWinner(`Congratulations, ${state.player2}, You won!`);
      } else {
        resultMessage = `The tournament is a draw!`;
        setTournamentWinner(`It's a Draw between ${state.player1} and ${state.player2}!`);
      }
      alert(resultMessage);
    } else {
      setCurrentGame((prev) => prev + 1);
    }
  };

  const handlePlayAgain = () => {
    // Reset the tournament state
    setScores({ Player1: 0, Player2: 0 });
    setCurrentGame(1);
    setTournamentWinner(null);
    setPreviousWinner(null);
  };

  const PLAYERS = {
    player1: {
      key: "player1",
      avatarUrl:
        "https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw",
      avatarBg: "#38A85C",
      configBg: "#DCF6DF",
    },
    player2: {
      key: "player2",
      avatarUrl: "https://www.w3schools.com/howto/img_avatar2.png",
      avatarBg: "#F5D244",
      configBg: "#F7EBD5",
    },
  };

  return (
    <div className="flex justify-center flex-col p-6 bg-white rounded-3xl shadow-lg gap-4 md:flex-row">
      <div className="flex-[.6]">
        <GameBoard
          whoStartsFirst={whoStartFirst.current}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          onGameEnd={handleGameEnd}
          passUndoFunction={(undo: () => void) => {
            undoRef.current = undo;
          }}
        />
      </div>
      <div className="flex flex-col gap-4 flex-[.4] px-8">
        <div className="flex flex-col items-center gap-4">
          <h1>{state.numberOfGames} Game Tournament</h1>
          {tournamentWinner ? (
            <p className="font-bold text-orange-600">{tournamentWinner}</p>
          ) : (
            <p>Playing Game {currentGame}</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <PlayerCard
            configBg={PLAYERS.player1.configBg}
            highlight={currentPlayer === "Player1"}
            avatarBg={PLAYERS.player1.avatarBg}
            avatarUrl={PLAYERS.player1.avatarUrl}
            name={state.player1}
            score={scores.Player1}
          />
          <PlayerCard
            configBg={PLAYERS.player2.configBg}
            highlight={currentPlayer === "Player2"}
            avatarBg={PLAYERS.player2.avatarBg}
            avatarUrl={PLAYERS.player2.avatarUrl}
            name={state.player2}
            score={scores.Player2}
          />
        </div>
        <hr />
        <div className="flex flex-col items-center gap-4">
          {tournamentWinner ? (
            <button
              onClick={handlePlayAgain}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow-2xl w-full"
            >
              Play Again
            </button>
          ) : (
            <>
              <button
                onClick={() => undoRef.current()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-2xl w-full"
              >
                Undo Step
              </button>
              <button className="mt-4 px-4 py-2 text-blue-500 bg-white rounded w-full shadow-2xl">
                End Tournament
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentManager;
