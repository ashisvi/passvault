import Button from "@/components/Button";
import Input from "@/components/Input";
import { View } from "@/components/Themed";
import { useState } from "react";
import { StyleSheet } from "react-native";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        onPress={() => {}}
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
