import { useVaultStore } from "@/stores/useVaultStore";
import { Stack } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const AuthLayout = () => {
  const { isVaultCreated } = useVaultStore();

  return (
    <View className="h-full py-10">
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#1e2939",
            borderWidth: 2,
            padding: 20,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Stack.Protected guard={isVaultCreated}>
          <Stack.Screen name="login-screen" />
        </Stack.Protected>
        <Stack.Protected guard={!isVaultCreated}>
          <Stack.Screen name="create-vault" />
        </Stack.Protected>
      </Stack>
      <Footer />
    </View>
  );
};

export default AuthLayout;

const Header = () => (
  <View className="flex items-center justify-center mt-12">
    <Image
      source={require("@/assets/logo.png")}
      className="w-32 h-32 mb-2"
      resizeMode="contain"
    />
    <Text className="text-4xl font-bold text-center text-sky-500 mb-5">
      PassVault
    </Text>
  </View>
);

const Footer = () => (
  <Text className="text-center mt-8 text-gray-400 text-sm px-6 mb-12">
    Make sure to remember your master password. It cannot be recovered if
    forgotten!
  </Text>
);
