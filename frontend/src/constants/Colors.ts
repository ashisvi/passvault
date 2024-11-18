const tintColorLight = "#1DA1F2"; // Twitter Blue
const tintColorDark = "#1DA1F2"; // White

export default {
  light: {
    text: "#000000", // Black
    background: "#FFFFFF", // White
    tint: tintColorLight,
    tabIconDefault: "#CCCCCC", // Light Gray
    tabIconSelected: tintColorLight,
    cardBackground: "#F5F8FA", // Light Gray for cards in light mode
    borderColor: "#E1E8ED", // Light border color
  },
  dark: {
    text: "#FFFFFF", // White
    background: "#14171A", // Dark Gray (Twitter's background)
    tint: tintColorDark,
    tabIconDefault: "#AAB8C2", // Light Gray for icons
    tabIconSelected: tintColorDark,
    cardBackground: "#192734", // Darker shade for cards in dark mode
    borderColor: "#657786", // Dark gray for borders
  },
};
