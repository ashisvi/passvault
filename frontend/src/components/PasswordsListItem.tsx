import useThemeColor from "@/hooks/useThemeColor";
import { Password } from "@/types/password";
import { Copy } from "iconsax-react-native";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

const PasswordsListItem = ({ password }: { password: Password }) => {
  const themeColor = useThemeColor();

  return (
    <View style={styles.card}>
      <Image
        src={`https://${password.websiteUrl}/favicon.ico`}
        style={styles.image}
      />
      <View style={styles.body}>
        <Text style={styles.website}>{password.websiteName}</Text>
        <Text style={[styles.username, { color: themeColor.tabIconDefault }]}>
          {password.username}
        </Text>
      </View>
      <Pressable>
        <Copy size={24} color={themeColor.tabIconDefault} />
      </Pressable>
    </View>
  );
};

export default PasswordsListItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  image: {
    height: 50,
    width: 50,
  },
  body: {
    flex: 1,
  },
  website: {
    fontWeight: "bold",
    fontSize: 18,
  },
  username: {
    fontSize: 15,
  },
  btn: {},
});
