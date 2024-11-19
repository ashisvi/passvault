import * as DevClient from "expo-dev-client";

import { Text, View } from "@/components/Themed";
import { useAuthStore } from "@/store/authStore";
import { Link, Redirect } from "expo-router";
import { Home } from "iconsax-react-native";
import { StyleSheet } from "react-native";

const IndexPage = () => {
  console.log("Check development build : ", DevClient.isDevelopmentBuild());
  const { isAuthenticated, user } = useAuthStore();

  console.log(isAuthenticated, user);

  if (isAuthenticated) <Redirect href="/(tabs)" />;

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
