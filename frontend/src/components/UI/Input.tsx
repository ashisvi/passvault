import React from "react";
import { TextInput } from "react-native";

interface InputProps {
  className?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  className = "",
  placeholder,
  value,
  setValue,
  secureTextEntry,
  autoFocus,
}) => {
  return (
    <TextInput
      className={`border border-sky-500/50 bg-gray-800 text-white px-4 py-4 rounded-lg text-lg ${className}`}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      value={value}
      onChangeText={setValue}
      autoFocus={autoFocus}
    />
  );
};

export default Input;
