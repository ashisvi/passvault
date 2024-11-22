import LinkButton from "@/components/LinkButton";
import { View } from "@/components/Themed";
import { useState } from "react";
import { StyleSheet } from "react-native";

const SettingPage = () => {
  const [sync, setSync] = useState(false);
  const [autoFill, setAutoFill] = useState(false);

  return (
    <View style={styles.container}>
      <LinkButton label="Profile" href="./setting/profile" />
      <LinkButton label="Permissions" href="./setting" />
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
      <LinkButton label="About" href="./setting/about" />
      <LinkButton label="Help" href="./setting/help" />
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
