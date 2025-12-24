import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  className?: string;
  onPress?: () => void;
  btnText?: string;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  onPress,
  isDisabled = false,
  btnText = "Button",
}) => {
  return (
    <TouchableOpacity
      className={`bg-sky-500 px-8 py-4 rounded-xl items-center justify-center opacity-100 ${
        isDisabled ? "opacity-50" : "opacity-100"
      } ${className}`}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text className="text-white text-lg font-bold">{btnText}</Text>
    </TouchableOpacity>
  );
};

export default Button;
