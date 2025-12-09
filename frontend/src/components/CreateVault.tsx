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
    <View className="w-full max-w-md">
      <Text className="text-xl font-semibold text-gray-200 text-center mb-6">
        Create your master password
      </Text>

      <Input
        placeholder="Master password (min 8 chars)"
        value={masterPassword}
        setValue={setMasterPassword}
        secureTextEntry
        className="mb-4"
      />

      <Text className="text-xl font-semibold text-gray-200 text-center mb-4">
        Re-enter master password
      </Text>

      <Input
        placeholder="Confirm master password"
        value={masterPassword}
        setValue={setMasterPassword}
        secureTextEntry
        className="mb-8"
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
