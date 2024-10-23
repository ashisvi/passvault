import { Stack } from "expo-router";

const PasswordsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "rgba(144, 70, 207, 0.5)",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Passwords",
        }}
      />
      <Stack.Screen
        name="add-password"
        options={{
          title: "Add Password",
        }}
      />
      <Stack.Screen
        name="[id]/password-page"
        options={{ title: "Password Page" }}
      />
      <Stack.Screen
        name="[id]/edit-password"
        options={{ title: "Edit passwords" }}
      />
    </Stack>
  );
};

export default PasswordsLayout;
