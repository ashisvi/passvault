import useThemeColor from "@/hooks/useThemeColor";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "./Themed";

interface ButtonProps {
  title: string;
  buttonType?: "primary" | "secondary";
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  buttonType = "primary",
  onPress,
  disabled,
  style,
}) => {
  const themeColor = useThemeColor();

  const buttonStyle =
    buttonType === "primary"
      ? { ...styles.primaryButton, backgroundColor: themeColor.text }
      : { ...styles.secondaryButton, backgroundColor: themeColor.background };

  const textStyle =
    buttonType === "primary"
      ? { color: themeColor.background }
      : { color: themeColor.text };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[buttonStyle, style]}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
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
  },
});
