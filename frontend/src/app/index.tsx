import { Text, View } from "@/components/Themed";
import { usePasswords } from "@/hooks/usePasswords";
import { useAuthStore } from "@/store/authStore";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

const HomePage = () => {
  const { isAuthenticated, user } = useAuthStore();
  console.log(isAuthenticated, user);
  const { passwords, isLoading, error, addPassword } = usePasswords();

  console.log(passwords, isLoading, error);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Link href={"/register"} style={{ color: "blue" }}>
        Register
      </Link>
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
