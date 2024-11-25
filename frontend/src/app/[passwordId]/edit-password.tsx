import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

const EditPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Password</Text>
    </View>
  );
};

export default EditPassword;

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
