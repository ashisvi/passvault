import Button from "@/components/UI/Button";
import { useVaultStore } from "@/stores/useVaultStore";
import React from "react";
import { Text, View } from "react-native";

const UnlockedPage = () => {
  const { lockVault, isUnlocked } = useVaultStore();

  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-3xl font-bold text-green-500">
        Unlocked Successfully
      </Text>
      <Text className="text-center text-gray-300 mt-6 text-lg">
        Your encrypted vault is ready. Add your first password!
      </Text>
      <Button btnText="Logout" className="bg-red-400" onPress={lockVault} />
    </View>
  );
};

export default UnlockedPage;
