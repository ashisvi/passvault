import useThemeColor from "@/hooks/useThemeColor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Add, User } from "iconsax-react-native";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const themeColor = useThemeColor();
  const [loaded, error] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
    MontserratBlack: require("@assets/fonts/Montserrat-Black.ttf"),
    MontserratBold: require("@assets/fonts/Montserrat-Bold.ttf"),
    MontserratExtraBold: require("@assets/fonts/Montserrat-ExtraBold.ttf"),
    MontserratExtraLight: require("@assets/fonts/Montserrat-ExtraLight.ttf"),
    MontserratLight: require("@assets/fonts/Montserrat-Light.ttf"),
    MontserratMedium: require("@assets/fonts/Montserrat-Medium.ttf"),
    MontserratRegular: require("@assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("@assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("@assets/fonts/Montserrat-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const screenOptions = {
    headerShown: true,
    headerTintColor: themeColor.text,
    headerStyle: { backgroundColor: themeColor.background },
    headerTitleAlign: "center" as "center",
  };

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StatusBar backgroundColor={themeColor.background} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen
          name="new-password"
          options={{
            ...screenOptions,
            title: "New password",
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            ...screenOptions,
            title: "Profile",
            headerLeft: () => (
              <Link href="/profile" style={{ marginLeft: 10 }}>
                <User size={28} color={themeColor.text} variant="Bold" />
              </Link>
            ),
            headerRight: () => (
              <Link href="/new-password" style={{ marginRight: 10 }}>
                <Add size={36} color={themeColor.text} />
              </Link>
            ),
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default RootLayout;
