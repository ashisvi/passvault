import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#9046CF",
        },
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
};
export default AuthLayout;
