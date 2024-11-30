import { Text } from "@/components/Themed";
import { usePasswords } from "@/hooks/usePasswords";
import useThemeColor from "@/hooks/useThemeColor";
import { passwordService } from "@/utils/passwordService";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Trash } from "iconsax-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";

const PasswordLayout = () => {
  const themeColors = useThemeColor();
  const { passwordId } = useLocalSearchParams();
  const { passwords } = usePasswords();

  const password = useMemo(() => {
    if (passwordId) {
      const password = passwords.find(
        (password) => password._id === passwordId
      );

      return password;
    }
  }, [passwordId, passwords]);

  const handleDelete = async () => {
    try {
      if (passwordId) {
        await passwordService.deletePassword(passwordId as string);
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      screenOptions={{
        title: "",
        headerTintColor: themeColors.text,
        headerStyle: {
          backgroundColor: themeColors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <Pressable onPress={handleDelete}>
              <Trash color="red" size={28} />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable style={styles.backBtn} onPress={() => router.back()}>
              <ArrowLeft color={themeColors.text} size={28} />
              <Text style={styles.backBtnTxt}>Back</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "Edit Password",
          headerTitleAlign: "center",
        }}
      />
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
