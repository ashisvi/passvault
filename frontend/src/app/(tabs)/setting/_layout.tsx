import useThemeColor from "@/hooks/useThemeColor";
import { Link, Stack } from "expo-router";
import { Add, User } from "iconsax-react-native";
import React from "react";
import { StyleSheet } from "react-native";

const SettingsLayout = () => {
  const { themeColors } = useThemeColor();

  const screenOptions = {
    headerTintColor: themeColors.text,
    headerStyle: { backgroundColor: themeColors.background },
    headerTitleAlign: "center" as "center",
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: "Setting",
          ...screenOptions,
          headerLeft: () => (
            <Link href="/setting/profile">
              <User size={28} color={themeColors.text} />
            </Link>
          ),
          headerRight: () => (
            <Link href="/new-password">
              <Add size={36} color={themeColors.text} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          ...screenOptions,
          title: "Profile",
          headerLeft: () => (
            <Link href="profile" style={{ marginLeft: 10 }}>
              <User size={28} color={themeColors.text} variant="Bold" />
            </Link>
          ),
          headerRight: () => (
            <Link href="/new-password" style={{ marginRight: 10 }}>
              <Add size={36} color={themeColors.text} />
            </Link>
          ),
        }}
      />
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="help" options={{ title: "Help" }} />
    </Stack>
  );
};

export default SettingsLayout;

const styles = StyleSheet.create({});
