import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  className?: string;
  onPress?: () => void;
  btnText?: string;
  isDisabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  onPress,
  isDisabled,
  btnText,
}) => {
  return (
    <TouchableOpacity
      className={
        "bg-sky-500 px-5 py-2 min-w-40 rounded-lg mt-10 flex justify-center items-center " +
        className
      }
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text className="text-lg text-white font-bold">{btnText}</Text>
    </TouchableOpacity>
  );
};

export default Button;
