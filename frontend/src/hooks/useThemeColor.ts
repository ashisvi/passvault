import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

interface Theme {
  name: string;
  colors: {
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    cardBackground: string;
    borderColor: string;
  };
}

const themes: { [key: string]: Theme } = {
  light: {
    name: "light",
    colors: Colors.light,
  },
  dark: {
    name: "dark",
    colors: Colors.dark,
  },
};

function useThemeColor() {
  const [theme, setTheme] = useState<Theme>(themes.light);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme === "dark") {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  }, [colorScheme]);

  const changeTheme = (themeName: string) => {
    if (themeName === "default") {
      setTheme(themes[colorScheme as string]);
    } else {
      setTheme(themes[themeName]);
    }
  };

  return { theme: theme.name, themeColors: theme.colors, changeTheme };
}

export default useThemeColor;
