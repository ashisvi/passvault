import { Button, Input, View } from "@/components";
import { useAuthStore } from "@/store/authStore";
import showToast from "@/utils/showToast";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // login function from authStore
  const { login } = useAuthStore();

  // handle login
  const handleLogin = async () => {
    try {
      await login(email, password);

      showToast("success", "Login successful");

      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 1000);
    } catch (error) {
      console.log(error);
      showToast("error", "Login failed", error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Input
          placeholder="Email"
          id="email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          id="password"
          isPassword
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        title="Login"
        onPress={handleLogin}
        disabled={false}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Login;
