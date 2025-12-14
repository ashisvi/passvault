import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { useVaultStore } from "@/stores/useVaultStore";
import React from "react";
import { Text, View } from "react-native";

const LoginScreen = () => {
  const [password, setPassword] = React.useState("");
  const { isLoading, unlockVault, isVaultCreated, storedMasterPassword } =
    useVaultStore();

  return (
    <View className="w-full h-80 max-w-md">
      <Text className="text-xl font-medium text-gray-200 text-center mb-6">
        Enter master password to unlock
      </Text>

      <Input
        secureTextEntry
        placeholder="Master password"
        value={password}
        setValue={setPassword}
        className="mb-8"
      />

      <Button
        onPress={() => unlockVault(password)}
        isDisabled={password.length < 8 || isLoading}
        btnText="Unlock Vault"
      />
    </View>
  );
};

export default LoginScreen;
