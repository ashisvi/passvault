import { Button, Input, View } from "@/components";
import { useAuthStore } from "@/store/authStore";
import showToast from "@/utils/showToast";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // register function from authStore
  const { register } = useAuthStore();

  // Handle register action
  const handleRegister = async () => {
    try {
      await register(name, email, password);

      showToast("success", "Registration successful");

      setTimeout(() => {
        router.replace("/(auth)/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      showToast("error", "Registration failed", error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Input
          placeholder="Full name"
          id="name"
          value={name}
          onChangeText={setName}
        />
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
        title="Register"
        onPress={handleRegister}
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

export default Register;
