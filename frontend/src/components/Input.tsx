import { StyleSheet, TextInput, TextStyle } from "react-native";

interface InputProps {
  placeholder: string;
  value?: string;
  id: string;
  isPassword?: boolean;
  onChangeText?: (e: string) => void;
  style?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  id,
  isPassword,
  onChangeText,
  style,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      id={id}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isPassword}
      style={[styles.input, style]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    color: "black",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
});
