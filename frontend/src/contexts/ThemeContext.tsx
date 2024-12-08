import * as SecureStore from "expo-secure-store";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext<{
  theme: string;
  toggleTheme: (newTheme: string) => void;
}>({
  theme: SecureStore.getItem("color-scheme") || Appearance.getColorScheme(),
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<string>(useContext(ThemeContext).theme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme }: any) => {
        if (!theme) {
          setTheme(colorScheme);
        }
      }
    );

    return () => subscription.remove();
  }, [theme, Appearance]);

  const toggleTheme = (newTheme: string) => {
    SecureStore.setItem("color-scheme", newTheme);
    setTheme(newTheme);
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
