import useThemeColor from "@/hooks/useThemeColor";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "./Themed";

interface ButtonProps {
  title: string;
  variant?: "primary" | "secondary";
  onPress: () => void;
  disabled?: boolean;
  style?: any;
  buttonTextStyle?: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  onPress,
  disabled,
  style,
  buttonTextStyle,
}) => {
  const themeColor = useThemeColor();

  const buttonStyle =
    variant === "primary"
      ? { ...styles.primaryButton, backgroundColor: themeColor.tint }
      : {
          ...styles.secondaryButton,
          backgroundColor: themeColor.cardBackground,
        };

  const textStyle =
    variant === "primary"
      ? { color: themeColor.background }
      : { color: themeColor.text };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[buttonStyle, style]}
    >
      <Text style={[styles.buttonText, textStyle, buttonTextStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 15,
    flex: 1,
    maxHeight: 50,
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 15,
    flex: 1,
    maxHeight: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
