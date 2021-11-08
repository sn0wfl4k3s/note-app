import React, { createContext, useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";

export type ThemeType = 'Light' | 'Dark';

export interface IThemeContext {
  theme: ThemeType;
  changeThemeTo: (themeType: ThemeType) => Promise<void>;
}

function useTheme(): IThemeContext {
  const themeKeyName = 'theme';
  const defaultTheme: ThemeType = 'Light';
  const storage = useStorage();
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  useEffect(() => {
    storage.getItemAsync(themeKeyName).then((value: ThemeType) => {
      if (value && value !== defaultTheme) {
        setTheme(value);
      }
    });
  }, []);

  return {
    theme,
    changeThemeTo: async (themeType: ThemeType): Promise<void> => {
      setTheme(themeType);
      await storage.setItemAsync(themeKeyName, themeType.toString());
    }
  }
}

const ThemeContext = createContext({} as IThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext;