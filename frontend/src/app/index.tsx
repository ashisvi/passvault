import { Button } from "@/components";
import { Text, View } from "@/components/Themed";
import useThemeColor from "@/hooks/useThemeColor";
import { useAuthStore } from "@/store/authStore";
import { Redirect, router } from "expo-router";
import { SecurityUser } from "iconsax-react-native";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

const IndexPage = () => {
  const themeColors = useThemeColor();
  const { isAuthenticated, user, fetchUser, token } = useAuthStore();

  console.log("~ app/index.tsx ~ user : ", user);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SecurityUser size={100} color={themeColors.tint} variant="Bulk" />
        <Text style={styles.title}>Welcome to PassVault</Text>
        <Text style={[styles.subtitle, { color: themeColors.borderColor }]}>
          Securely store and manage your passwords
        </Text>
        <Button
          title="Login"
          onPress={() => router.navigate("/(auth)/login")}
          style={styles.button}
        />
        <Button
          title="Register"
          onPress={() => router.navigate("/(auth)/register")}
          style={styles.button}
        />
      </View>
      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "semibold",
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DA1F2",
    marginBottom: 10,
  },
  version: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default IndexPage;
