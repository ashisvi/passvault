import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

function useThemeColor() {
  const theme = useColorScheme() ?? "light";
  const themeColors = Colors[theme];

  return themeColors;
}

export default useThemeColor;
