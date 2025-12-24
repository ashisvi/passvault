import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "@/global.css";
import { useVaultStore } from "@/stores/useVaultStore";
import { View } from "react-native";

const RootLayout = () => {
  const { checkIfFirstTime, isLoading, isUnlocked, isVaultCreated } =
    useVaultStore();

  useEffect(() => {
    checkIfFirstTime();
  }, []);

  // TODO: Use SafeAreaViewProvider
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
              <Stack.Screen name="(tabs)" />
            </Stack.Protected>
            <Stack.Protected guard={!isUnlocked}>
              <Stack.Screen name="(auth)" />
            </Stack.Protected>
          </Stack>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
