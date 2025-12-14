import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { useVaultStore } from "@/stores/useVaultStore";
import React from "react";
import { Text, View } from "react-native";

const CreateVault = () => {
  const { createVault, isLoading } = useVaultStore();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <View className="w-full max-w-md">
      <Text className="text-xl font-medium text-gray-200 text-center mb-6">
        Create your master password
      </Text>

      <Input
        placeholder="Master password (min 8 chars)"
        value={password}
        setValue={setPassword}
        secureTextEntry
        className="mb-4"
      />

      <Text className="text-xl font-medium text-gray-200 text-center mb-4">
        Re-enter master password
      </Text>

      <Input
        placeholder="Confirm master password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        secureTextEntry
        className="mb-8"
      />

      <Button
        onPress={() => createVault(password)}
        btnText="Confirm & Create"
        isDisabled={
          (password.length < 8 && password === confirmPassword) || isLoading
        }
      />
    </View>
  );
};

export default CreateVault;
