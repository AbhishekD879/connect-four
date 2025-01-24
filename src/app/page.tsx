import GameSelection from "@/app/_components/GameSelection";

export default function Home() {
  return (
    <div className="h-full">
      <h1 className="text-[#656A92] uppercase">Connect Four !!</h1>
      <p>Play with other players around the world !!</p>
      <GameSelection />
    </div>
  );
}
