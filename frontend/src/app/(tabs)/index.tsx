import { PasswordsList, View } from "@/components";
import { usePasswords } from "@/hooks/usePasswords";
import { StyleSheet } from "react-native";

const HomePage = () => {
  const { passwords } = usePasswords();

  return (
    <View style={styles.container}>
      <PasswordsList data={passwords} />
    </View>
  );
};

export default HomePage;

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
