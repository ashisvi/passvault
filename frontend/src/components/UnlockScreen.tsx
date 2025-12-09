import React from "react";
import { Text, View } from "react-native";
import Button from "./UI/Button";
import Input from "./UI/Input";

const UnlockScreen: React.FC<{
  masterPassword: string;
  setMasterPassword: (password: string) => void;
  unlockVault: (pw: string) => void;
  isLoading: boolean;
}> = ({ masterPassword, setMasterPassword, unlockVault, isLoading }) => {
  return (
    <View className="w-full max-w-md">
      <Text className="text-xl font-semibold text-gray-200 text-center mb-8">
        Enter master password to unlock
      </Text>

      <Input
        secureTextEntry
        placeholder="Master password"
        value={masterPassword}
        setValue={setMasterPassword}
        className="mb-8"
      />

      <Button
        onPress={() => unlockVault(masterPassword)}
        isDisabled={masterPassword.length < 8 || isLoading}
        btnText="Unlock Vault"
      />
    </View>
  );
};

export default UnlockScreen;
