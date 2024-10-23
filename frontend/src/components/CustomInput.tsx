import { TextInput, View } from "react-native";

interface InputProps {
  placeholder?: string;
  icon?: any;
  password?: boolean;
  value?: any;
  setValue?: any;
}

const CustomInput: React.FC<InputProps> = ({
  placeholder,
  icon,
  password,
  value,
  setValue,
}) => {
  return (
    <View
      className={`bg-grey/40 w-full p-3 rounded-lg relative border`}
      style={{
        borderColor: "#9046cf",
      }}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        className="text-lg"
        cursorColor="#18191F"
        secureTextEntry={password}
      />
    </View>
  );
};

export default CustomInput;
