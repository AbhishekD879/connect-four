import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Initial settings object
const initialSettings = {
  player1: "David",
  player2: "Mike",
  numberOfGames: 2,
  whoStarts: "ALTERNATIVE",
};

// Action types
type Action =
  | {
      type: "UPDATE_SETTING";
      key: keyof typeof initialSettings;
      value: string | number;
    }
  | { type: "RESET_SETTINGS" };

// Reducer function
const settingsReducer = (state: typeof initialSettings, action: Action) => {
  switch (action.type) {
    case "UPDATE_SETTING":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "RESET_SETTINGS":
      return initialSettings;
    default:
      throw new Error(`Unknown action type`);
  }
};

// Create the context
const SettingsContext = createContext<{
  state: typeof initialSettings;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialSettings,
  dispatch: () => {},
});

// Context provider component
export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(settingsReducer, initialSettings);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the context
export const useSettingsContext = () => useContext(SettingsContext);
