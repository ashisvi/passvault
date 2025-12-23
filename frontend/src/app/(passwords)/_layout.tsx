import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const PasswordsLayout = () => {
  return (
    <View className="flex-1 h-full">
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
        <Stack.Screen
          name="add-password"
          options={{
            headerShown: true,
            headerTitle: "Add Password",
            headerShadowVisible: false,
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        <Stack.Screen
          name="view-password"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </View>
  );
};

export default PasswordsLayout;
