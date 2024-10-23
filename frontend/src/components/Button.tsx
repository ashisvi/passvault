import { Pressable, Text } from "react-native";

interface ButtonProps {
  btnText?: string;
  handleOnPress?: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  btnText,
  handleOnPress,
  isDisabled,
}) => {
  return (
    <Pressable
      className={`bg-primary/80 px-3 py-2 rounded-lg w-[150px] items-center justify-center mt-4 ${isDisabled && "bg-primary/50"}`}
      onPress={handleOnPress}
      disabled={isDisabled}
    >
      <Text className="text-white font-semibold text-lg">
        {btnText || "Submit"}
      </Text>
    </Pressable>
  );
};

export default Button;
