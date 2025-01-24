import SelectionButton, {
  GameSelectionButtonProps,
} from "@/app/_components/SelectionButton";
import { Brain, Globe, UserRound, Users } from "lucide-react";
import React from "react";

const GameSelection = () => {
  const selectionButtons: GameSelectionButtonProps[] = [
    {
      bgColor: "#41A2FF",
      comingSoon: true,
      Icon: UserRound,
      text: "Custom Game",
    },
    {
      bgColor: "#4271FE",
      comingSoon: false,
      Icon: Users,
      text: "Two Players",
      to: "/two-player",
    },
    { bgColor: "#4341FF", comingSoon: true, Icon: Globe, text: "Game Online" },
    {
      bgColor: "#6142FF",
      comingSoon: true,
      Icon: Brain,
      text: "Training Games",
    },
  ];
  return (
    <div className="w-full my-4 h-[80%] rounded-3xl shadow-2xl bg-zinc-300">
      <div className="bg-white rounded-3xl h-[90%] flex flex-col divide-gray-800">
        <div className="flex-[.5] flex flex-col justify-center p-3">
          <div className="bg-[#F15A3D] flex items-center justify-center p-4 w-[150px] h-[150px] uppercase rounded-3xl shadow-[#F15A3D] shadow-lg">
            Play
          </div>
        </div>
        <div className="flex-[.3] grid place-items-center grid-cols-2 w-[95%] mx-auto gap-x-2">
          {selectionButtons.map(
            (button: GameSelectionButtonProps): React.ReactNode => (
              <SelectionButton {...button} />
            ),
          )}
        </div>
      </div>
      <p className="px-[5%] mt-4 text-start"> &copy; 2020</p>
    </div>
  );
};

export default GameSelection;
