import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext } from '../utils';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // 1. Check localStorage
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';

      // 2. Fallback: system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const toggleDark = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
