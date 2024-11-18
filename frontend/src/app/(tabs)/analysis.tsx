import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

const Analysis = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analysis Page</Text>
    </View>
  );
};

export default Analysis;

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
