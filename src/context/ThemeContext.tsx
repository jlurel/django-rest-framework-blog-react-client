import React, { Context, createContext, useContext, useEffect, useState } from 'react';
import { ChildrenProps, ThemeContextInterface } from '../types';

const ThemeContext: Context<ThemeContextInterface> = createContext<ThemeContextInterface>({
  isDark: true,
  toggleBlackTheme: () => {},
});

export function ThemeContextProvider({ children }: ChildrenProps) {
  const [isDark, toggleBlackTheme] = useState<boolean>(localStorage.getItem('isDark') === 'true');

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleBlackTheme }}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;
