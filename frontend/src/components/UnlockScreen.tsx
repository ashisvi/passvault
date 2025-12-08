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
    <View className="justify-center items-center w-full h-1/2 bg-white">
      <Text className="text-lg font-medium">
        Enter master password to unlock
      </Text>

      <Input
        className="mt-2"
        secureTextEntry={true}
        placeholder="Master password"
        value={masterPassword}
        setValue={setMasterPassword}
      />

      <Button
        onPress={unlockVault.bind(null, masterPassword)}
        isDisabled={masterPassword.length < 8 || isLoading}
        btnText="Enter"
      />
    </View>
  );
};

export default UnlockScreen;
