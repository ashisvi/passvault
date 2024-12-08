import { Text, View } from "@/components/Themed";
import useThemeColor from "@/hooks/useThemeColor";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import { ArrowRotateRight } from "iconsax-react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import Input from "./Input";

interface GeneratePasswordProps {
  password: string;
  setPassword: (password: string) => void;
  handleGeneratePassword: (
    length: number,
    numbers: boolean,
    lowercase: boolean,
    uppercase: boolean,
    symbols: boolean
  ) => void;
}

const GeneratePassword: React.FC<GeneratePasswordProps> = ({
  password,
  setPassword,
  handleGeneratePassword,
}) => {
  const themeColors = useThemeColor();
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [symbols, setSymbols] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Password</Text>
      <View
        style={[styles.inputWrapper, { borderColor: themeColors.borderColor }]}
      >
        <Input
          id="password"
          placeholder="Generate password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <ArrowRotateRight
          size={28}
          color={themeColors.borderColor}
          onPress={() =>
            handleGeneratePassword(
              length,
              numbers,
              lowercase,
              uppercase,
              symbols
            )
          }
        />
      </View>
      <View style={styles.controls}>
        <View style={styles.controlSection}>
          <View style={styles.controlWrapper}>
            <Text style={styles.label}>Length</Text>
            <Input
              id="length"
              placeholder="8"
              value={length}
              onChangeText={(value) => setLength(parseInt(value))}
              style={{ width: 40, marginBottom: 0 }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.controlWrapper}>
            <Text style={styles.label}>Numbers</Text>
            <Checkbox
              value={numbers}
              color={themeColors.tint}
              onValueChange={(value) => setNumbers(value)}
            />
          </View>
          <View style={styles.controlWrapper}>
            <Text style={styles.label}>Lowercase</Text>
            <Checkbox
              value={lowercase}
              color={themeColors.tint}
              onValueChange={(value) => setLowercase(value)}
            />
          </View>
        </View>
        <View style={styles.controlSection}>
          <View style={styles.controlWrapper}>
            <Slider
              style={{ width: 200, height: 40, maxWidth: "100%" }}
              step={1}
              minimumValue={6}
              maximumValue={20}
              thumbTintColor={themeColors.tint}
              minimumTrackTintColor={themeColors.tint}
              maximumTrackTintColor={themeColors.text}
              onValueChange={(value) => setLength(value)}
            />
          </View>
          <View style={styles.controlWrapper}>
            <Text style={styles.label}>Symbols</Text>
            <Checkbox
              value={symbols}
              color={themeColors.tint}
              onValueChange={(value) => setSymbols(value)}
            />
          </View>
          <View style={styles.controlWrapper}>
            <Text style={styles.label}>Uppercase</Text>
            <Checkbox
              value={uppercase}
              color={themeColors.tint}
              onValueChange={(value) => setUppercase(value)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default GeneratePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    minHeight: 200,
  },
  heading: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRadius: 10,
    paddingVertical: 4,
    paddingRight: 12,
    width: "100%",
  },
  input: {
    borderWidth: 0,
    marginBottom: 0,
    flex: 1,
  },
  controls: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 25,
    marginTop: 20,
  },
  controlSection: {
    flex: 1,
    gap: 20,
  },
  controlWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  label: {
    fontWeight: "semibold",
    fontSize: 17,
  },
});
