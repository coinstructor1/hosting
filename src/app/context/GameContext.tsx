
import React, { createContext, useContext, useState } from "react";

interface GameContextType {
  clicksPending: boolean;
  setClicksPending: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [clicksPending, setClicksPending] = useState(false);
  

  return (
    <GameContext.Provider value={{ clicksPending, setClicksPending }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
