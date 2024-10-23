import { Image, TextInput, View } from "react-native";
import { icons } from "../constants";

interface SearchInputProps {
  value?: string;
  setValue?: any;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  setValue,
  placeholder,
}) => {
  return (
    <View className="w-full bg-grey/30 rounded-xl py-3 px-4 flex-row items-center">
      <TextInput
        placeholder={placeholder || "Search"}
        className="text-lg flex-1"
        cursorColor="#18191F"
        value={value}
        onChangeText={setValue}
      />
      <Image source={icons.search} resizeMode="contain" className="h-8 w-8" />
    </View>
  );
};

export default SearchInput;
