import { Text, TouchableOpacity } from "react-native";

const FilterBtn = ({ text, isActive }: { text: string; isActive: boolean }) => {
  return (
    <TouchableOpacity
      className={`min-w-[50px] flex justify-center items-center rounded-lg px-4 py-1 mr-3 ${
        isActive ? "bg-secondary" : "bg-grey"
      }`}
    >
      <Text
        className={`font-semibold text-[16px] ${
          isActive ? "text-white" : "text-white/70"
        }`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterBtn;
