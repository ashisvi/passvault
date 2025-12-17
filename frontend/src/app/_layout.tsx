import { Stack } from "expo-router";
import React, { useEffect } from "react";

import "@/global.css";
import { useVaultStore } from "@/stores/useVaultStore";
import { View } from "react-native";

const RootLayout = () => {
  const { checkIfFirstTime, isLoading, isUnlocked, isVaultCreated } =
    useVaultStore();

  useEffect(() => {
    checkIfFirstTime();
  }, []);

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "light",
          contentStyle: {
            backgroundColor: "#1e2939",
          },
        }}
      >
        <Stack.Protected guard={isUnlocked}>
          <Stack.Screen name="unlocked-page" />
        </Stack.Protected>
        <Stack.Protected guard={!isUnlocked}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </View>
  );
};

export default RootLayout;
