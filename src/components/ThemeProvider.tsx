'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type BaseTheme = 'light' | 'dark';
export type AccentTheme = 'purple' | 'sky' | 'rose' | 'emerald' | 'amber';

interface ThemeContextType {
  base: BaseTheme;
  accent: AccentTheme;
  setBase: (b: BaseTheme) => void;
  setAccent: (a: AccentTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  base: 'light',
  accent: 'purple',
  setBase: () => {},
  setAccent: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [base, setBaseState] = useState<BaseTheme>('light');
  const [accent, setAccentState] = useState<AccentTheme>('purple');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedBase = localStorage.getItem('theme-base') as BaseTheme | null;
    const savedAccent = localStorage.getItem('theme-accent') as AccentTheme | null;
    if (savedBase) setBaseState(savedBase);
    if (savedAccent) setAccentState(savedAccent);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    html.className = '';
    html.classList.add(base, `theme-${accent}`);
    localStorage.setItem('theme-base', base);
    localStorage.setItem('theme-accent', accent);
  }, [base, accent, mounted]);

  const setBase = (b: BaseTheme) => setBaseState(b);
  const setAccent = (a: AccentTheme) => setAccentState(a);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ base, accent, setBase, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
