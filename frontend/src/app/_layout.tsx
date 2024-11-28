import { ThemeProvider } from "@/contexts/ThemeContext";
import useThemeColor from "@/hooks/useThemeColor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const themeColors = useThemeColor();
  NavigationBar.setBackgroundColorAsync(themeColors.background);

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
    headerTintColor: themeColors.text,
    headerStyle: { backgroundColor: themeColors.background },
    headerTitleAlign: "center" as "center",
  };

  return (
    <ThemeProvider>
      <QueryClientProvider client={new QueryClient()}>
        <StatusBar backgroundColor={themeColors.background} />
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
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
