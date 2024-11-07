import { Text, View } from "@/components/Themed";
import { usePasswords } from "@/hooks/usePasswords";
import { useAuthStore } from "@/store/authStore";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

const HomePage = () => {
  const { isAuthenticated, user } = useAuthStore();
  console.log(isAuthenticated, user);
  const { passwords } = usePasswords();

  console.log(passwords);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Link href="register">Register</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
  },
});

export default HomePage;
