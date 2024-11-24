import LinkButton from "@/components/LinkButton";
import Select from "@/components/Select";
import { View } from "@/components/Themed";
import useThemeColor from "@/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet } from "react-native";

const SettingPage = () => {
  const { theme, changeTheme } = useThemeColor();

  const [sync, setSync] = useState(false);
  const [autoFill, setAutoFill] = useState(false);

  return (
    <View style={styles.container}>
      <LinkButton label="Profile" href="/(tabs)/setting/profile" />
      {/* Theme button */}
      <LinkButton
        label="Switch account"
        customButton={
          <Select
            data={[
              { label: "Default", value: "default" },
              { label: "Dark", value: "dark" },
              { label: "Light", value: "light" },
            ]}
            onChange={(value) => changeTheme(value)}
            placeholder={theme}
            value={theme}
          />
        }
      />
      <LinkButton label="Permissions" href="/(tabs)/setting" />
      <LinkButton
        label="Sync"
        switchBtn
        switchValue={sync}
        setSwitchValue={setSync}
      />
      <LinkButton
        label="Auto Fill"
        switchBtn
        switchValue={autoFill}
        setSwitchValue={setAutoFill}
      />
      <LinkButton label="About" href="/(tabs)/setting/about" />
      <LinkButton label="Help" href="/(tabs)/setting/help" />
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
});
