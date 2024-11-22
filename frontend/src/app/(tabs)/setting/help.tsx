import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

const HelpPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Help Page</Text>
    </View>
  );
};

export default HelpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 20,
  },
});
