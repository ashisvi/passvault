import useThemeColor from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export interface SelectItem {
  label: string;
  value: string;
}

export interface SelectProps {
  data: SelectItem[];
  placeholder: string;
  onChange: (item: string) => void;
  value: string;
}

const Select: React.FC<SelectProps> = ({
  placeholder,
  onChange,
  value,
  data,
}) => {
  const themeColors = useThemeColor();
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (item: SelectItem) => onChange(item.value);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          {
            backgroundColor: themeColors.cardBackground,
            borderColor: isFocus ? themeColors.tint : themeColors.text,
          },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          { color: themeColors.tabIconDefault },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: themeColors.tabIconDefault },
        ]}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  dropdown: {
    height: 50,
    width: 150,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 4,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
