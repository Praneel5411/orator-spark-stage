import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
  hearts: number;
  xp: number;
  streak: number;
  gems: number;
  currentLevel: number;
  completedLevels: number[];
  cooldownEndTime: number | null;
}

interface GameContextType extends GameState {
  loseHeart: () => void;
  gainXP: (amount: number) => void;
  completeLevel: (levelId: number) => void;
  resetHearts: () => void;
  setCooldown: (minutes: number) => void;
  addGems: (amount: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>({
    hearts: 5,
    xp: 0,
    streak: 3,
    gems: 150,
    currentLevel: 1,
    completedLevels: [],
    cooldownEndTime: null,
  });

  const loseHeart = () => {
    setState(prev => {
      const newHearts = Math.max(0, prev.hearts - 1);
      if (newHearts === 0) {
        return { ...prev, hearts: 0, cooldownEndTime: Date.now() + 30 * 60 * 1000 };
      }
      return { ...prev, hearts: newHearts };
    });
  };

  const gainXP = (amount: number) => {
    setState(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const completeLevel = (levelId: number) => {
    setState(prev => ({
      ...prev,
      completedLevels: [...new Set([...prev.completedLevels, levelId])],
      currentLevel: Math.max(prev.currentLevel, levelId + 1),
    }));
  };

  const resetHearts = () => {
    setState(prev => ({ ...prev, hearts: 5, cooldownEndTime: null }));
  };

  const setCooldown = (minutes: number) => {
    setState(prev => ({ ...prev, cooldownEndTime: Date.now() + minutes * 60 * 1000 }));
  };

  const addGems = (amount: number) => {
    setState(prev => ({ ...prev, gems: prev.gems + amount }));
  };

  return (
    <GameContext.Provider value={{
      ...state,
      loseHeart,
      gainXP,
      completeLevel,
      resetHearts,
      setCooldown,
      addGems,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
