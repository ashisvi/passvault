import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const PasswordsLayout = () => {
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
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
};

export default PasswordsLayout;
