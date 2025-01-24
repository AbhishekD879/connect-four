import { useSettingsContext } from "@/lib/context/ConfigureContext";
import React, { useState } from "react";

export enum WhoStarts {
  WINNER_FIRST = "Winner First",
  LOSER_FIRST = "Loser First",
  ALTERNATIVE = "Alternative",
  PLAYER_1 = "Player 1",
  PLAYER_2 = "Player 2",
}

const WhoStartsDropDown = ({ closeDialog }: { closeDialog: () => void }) => {
  const { state, dispatch } = useSettingsContext();
  const [selectedValue, setSelectedValue] = useState(state.whoStarts);

  const options = Object.values(WhoStarts); // Use enum values as options

  const handleSave = () => {
    dispatch({
      type: "UPDATE_SETTING",
      key: "whoStarts",
      value: selectedValue,
    });
    closeDialog();
  };

  return (
    <div className="p-4 rounded">
      <h1 className="text-xl font-bold text-center mb-4">Who Starts</h1>
      <div className="flex flex-col gap-4">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 cursor-pointer bg-[#F0F0FB] rounded-2xl px-3 py-3.5"
          >
            <input
              type="radio"
              name="whoStarts"
              value={option}
              checked={selectedValue === option}
              onChange={() => setSelectedValue(option)}
              className="cursor-pointer"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="text-black px-4 py-2 rounded shadow border-zinc-300"
          onClick={closeDialog}
        >
          Cancel
        </button>
        <button
          className="bg-[#467BFD] text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default WhoStartsDropDown;
