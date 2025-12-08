import React from "react";
import { Text, View } from "react-native";
import Button from "./UI/Button";
import Input from "./UI/Input";

const CreateVault: React.FC<{
  masterPassword: string;
  setMasterPassword: (password: string) => void;
  createVault: () => void;
  isLoading: boolean;
}> = ({ masterPassword, createVault, isLoading, setMasterPassword }) => {
  return (
    <View className="justify-center items-center w-full h-1/2 bg-white">
      <Text className="text-lg font-medium">Create your master password</Text>

      <Input
        className="mt-2 mb-5"
        placeholder="Master password (min 8 chars)"
        value={masterPassword}
        setValue={setMasterPassword}
        secureTextEntry
      />

      <Text className="text-lg font-medium">Re-enter master password</Text>

      <Input
        className="mt-2"
        placeholder="Confirm master password"
        value={masterPassword}
        setValue={setMasterPassword}
        secureTextEntry
      />

      <Button
        onPress={createVault}
        btnText="Confirm & Create"
        isDisabled={masterPassword.length < 8 || isLoading}
      />
    </View>
  );
};

export default CreateVault;
