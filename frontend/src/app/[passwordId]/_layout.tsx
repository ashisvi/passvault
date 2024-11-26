import { Text } from "@/components/Themed";
import useThemeColor from "@/hooks/useThemeColor";
import { router, Stack } from "expo-router";
import { ArrowLeft, Trash } from "iconsax-react-native";
import { Pressable, StyleSheet } from "react-native";

const PasswordLayout = () => {
  const themeColors = useThemeColor();

  return (
    <Stack
      screenOptions={{
        title: "",
        headerTintColor: themeColors.text,
        headerStyle: {
          backgroundColor: themeColors.background,
        },
        headerLeft: () => (
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft color={themeColors.text} size={28} />
            <Text style={styles.backBtnTxt}>Back</Text>
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => <Trash color="red" size={28} />,
        }}
      />
      <Stack.Screen name="edit-password" />
    </Stack>
  );
};

export default PasswordLayout;

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 5,
  },
  backBtnTxt: {
    fontWeight: "semibold",
    fontSize: 18,
  },
});
