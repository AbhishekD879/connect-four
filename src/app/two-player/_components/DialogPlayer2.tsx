import { useState } from "react";
import { useSettingsContext } from "@/lib/context/ConfigureContext";

const DialogPlayer2 = ({ onClose }: { onClose: () => void }) => {
  const { state, dispatch } = useSettingsContext();
  const [name, setName] = useState(state.player2);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-y-7 p-6">
        <h1 className="font-semibold text-center">Set Player 1 Name</h1>
        <input
          className="border px-2 outline-none rounded py-3 border-zinc-300 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-[#467BFD] h-8 text-center w-full rounded-2xl shadow text-white"
          onClick={() => {
            dispatch({
              type: "UPDATE_SETTING",
              key: "player2",
              value: name,
            });
            onClose();
          }}
        >
          Save name
        </button>
      </div>
    </>
  );
};

export default DialogPlayer2;
