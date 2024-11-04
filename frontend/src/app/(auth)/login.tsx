import { Button, CustomInput } from "@/components";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { onLogin } = useAuth();

  const login = async () => {
    let result;
    if (onLogin) {
      result = await onLogin(email, password);
      if (result && result?.error) {
        alert(result?.msg);
      }
    } else {
      alert("Login function is not available.");
    }

    if (result && result?.error) {
      alert(result?.msg);
    }
  };

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <View className="flex-1 justify-center items-center">
      <View className="bg-grey/20 w-[90%] rounded-lg p-5 justify-between items-center">
        <Text className="text-primary text-2xl font-bold mb-5">Login</Text>
        <View className="w-full py-3">
          <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        </View>
        <View className="w-full py-3">
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            password
          />
        </View>
        <Button handleOnPress={login} isDisabled={disabled} />
        
        <Text className="mt-3">
          Not registered?
          <Link href="register" className="text-secondary">
            <Text> Register</Text>
          </Link>
          {" "}or{" "}
          <Link href="/sign-in" className="text-secondary">
            <Text>Sign in with Google</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default Login;
