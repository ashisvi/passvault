import useThemeColor from "@/hooks/useThemeColor";
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
  const themeColor = useThemeColor();

  return (
    <TextInput
      placeholder={placeholder}
      id={id}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isPassword}
      style={[
        styles.input,
        style,
        { borderColor: themeColor.borderColor, color: themeColor.text },
      ]}
      placeholderTextColor={themeColor.borderColor}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    width: "100%",
  },
});
