import themes from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";

const useThemeColor = () => {
  const { theme } = useTheme();
  return themes[theme] || themes.light;
};

export default useThemeColor;
