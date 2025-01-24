import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import DialogPlayer1 from "@/app/two-player/_components/DialogPlayer1";
import DialogPlayer2 from "@/app/two-player/_components/DialogPlayer2";
import GamesDropDown from "@/app/two-player/_components/GamesDropDown";
import WhoStartsDropDown from "@/app/two-player/_components/WhoStartsDropDown";

// Define dialog types
type DialogType = "player1" | "player2" | "numberOfGames" | "whoStarts" | null;

// Context Interface
interface DialogContextType {
  openDialog: (type: DialogType) => void;
  closeDialog: () => void;
}

// Create Dialog Context
const DialogContext = createContext<DialogContextType | null>(null);

// DialogProvider Component
export const DialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  const openDialog = useCallback((type: DialogType) => {
    setDialogType(type); // Set the dialog type to determine the content
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const closeDialog = useCallback(() => {
    setDialogType(null); // Reset the dialog type
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  const renderDialogContent = () => {
    switch (dialogType) {
      case "player1":
        return <DialogPlayer1 onClose={closeDialog} />;
      case "player2":
        return <DialogPlayer2 onClose={closeDialog} />;
      case "numberOfGames":
        return <GamesDropDown closeDialog={closeDialog} />;
      case "whoStarts":
        return <WhoStartsDropDown closeDialog={closeDialog} />;
      default:
        return null;
    }
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {/* Shared Dialog */}
      <dialog
        ref={dialogRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backdropFilter: "blur(10px)",
          minWidth: "0", // Ensure no minWidth
        }}
        className="bg-white rounded-2xl shadow p-4 backdrop-blur-md w-full md:h-auto md:!w-[30%]"
      >
        {renderDialogContent()}
      </dialog>
    </DialogContext.Provider>
  );
};

// Custom Hook
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
