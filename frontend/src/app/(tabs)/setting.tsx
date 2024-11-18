import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

const SettingPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting Page</Text>
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
});
