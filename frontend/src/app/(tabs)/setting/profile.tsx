import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import Select, { SelectItem } from "@/components/Select";
import { Text, View } from "@/components/Themed";
import useThemeColor from "@/hooks/useThemeColor";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const [account, setAccount] = useState(user?._id);
  const { themeColors } = useThemeColor();

  const data: SelectItem = [
    {
      label: user?.name,
      value: user?._id,
    },
  ];

  const handleLogout = async () => {
    await logout();
    router.replace("/register");
  };

  return (
    <View style={styles.container}>
      {/* User info */}
      <View style={styles.userInfo}>
        {/* ToDo: Add profile picture */}
        <Text style={[styles.username, styles.text]}>{user?.name}</Text>
        <Text
          style={[
            styles.email,
            styles.text,
            { color: themeColors.tabIconDefault },
          ]}
        >
          {user?.email}
        </Text>
        <Button
          onPress={() => {}}
          title="Edit Profile"
          variant="secondary"
          style={[styles.button, { borderColor: themeColors.borderColor }]}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {/* ToDo: Switch account option */}
        <LinkButton
          label="Switch account"
          customButton={
            <Select
              data={data}
              onChange={setAccount}
              placeholder={`${user?.name}`}
              value={account}
            />
          }
        />
        <LinkButton label="Security" />
        <LinkButton label="Trusted devices" />
        <LinkButton label="Backup" />
      </View>

      {/* Logout button */}
      <Button
        onPress={handleLogout}
        title="Logout"
        variant="secondary"
        style={[
          styles.button,
          {
            borderColor: "#E6001F",
            paddingHorizontal: 20,
            backgroundColor: "transparent",
          },
        ]}
        buttonTextStyle={{ color: "#E6001F" }}
      />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userInfo: {
    marginVertical: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 17,
  },
  username: {
    fontWeight: "bold",
  },
  email: {
    fontWeight: "semibold",
  },
  button: {
    marginTop: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 40,
  },

  controls: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 15,
  },
});
