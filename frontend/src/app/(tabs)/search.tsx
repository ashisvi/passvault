import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

const SearchPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Page</Text>
    </View>
  );
};

export default SearchPage;

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
