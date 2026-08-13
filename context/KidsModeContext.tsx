'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const KidsModeContext = createContext<{
  kidsMode: boolean;
  setKidsMode: (v: boolean) => void;
}>({ kidsMode: false, setKidsMode: () => {} });

export function KidsModeProvider({ children }: { children: React.ReactNode }) {
  const [kidsMode, setKidsMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('kidsMode');
    if (stored) setKidsMode(stored === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('kidsMode', kidsMode ? 'true' : 'false');
  }, [kidsMode]);

  return (
    <KidsModeContext.Provider value={{ kidsMode, setKidsMode }}>
      {children}
    </KidsModeContext.Provider>
  );
}

export const useKidsMode = () => useContext(KidsModeContext);
