import { Text, View } from "@/components/Themed";
import { useAuthStore } from "@/store/authStore";
import { Link, Redirect } from "expo-router";
import { Home } from "iconsax-react-native";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

const IndexPage = () => {
  const { isAuthenticated, user, token, setAuthenticated } = useAuthStore();

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    }
  }, [token]);

  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return (
    <View style={styles.container}>
      <Home color="white" />
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

export default IndexPage;
