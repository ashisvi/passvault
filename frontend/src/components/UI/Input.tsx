import React from "react";
import { TextInput } from "react-native";

interface InputProps {
  className?: string;
  placeholder?: string;
  isAutoFocus?: boolean;
  value: string;
  setValue: (password: string) => void;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({
  isAutoFocus,
  placeholder,
  value,
  setValue,
  className,
  secureTextEntry,
}) => {
  return (
    <TextInput
      className={
        "border border-sky-500 w-full p-2 text-lg rounded " + className
      }
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      autoFocus={isAutoFocus}
    />
  );
};

export default Input;
