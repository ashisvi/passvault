import themes from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";

interface Color {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  cardBackground: string;
  borderColor: string;
}

const useThemeColor = (): Color => {
  const { theme } = useTheme();
  return themes[theme] || themes.light;
};

export default useThemeColor;
