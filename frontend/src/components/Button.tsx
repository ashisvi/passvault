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
  const buttonStyle =
    buttonType === "primary" ? styles.primaryButton : styles.secondaryButton;

  const textStyle =
    buttonType === "primary"
      ? styles.primaryButtonText
      : styles.secondaryButtonText;

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
    backgroundColor: "black",
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
    backgroundColor: "white",
    // borderColor: "black",
    // borderWidth: 1,
    flex: 1,
    maxHeight: 50,
  },
  buttonText: {
    fontSize: 16,
  },
  primaryButtonText: {
    color: "white",
  },
  secondaryButtonText: {
    color: "black",
  },
});
