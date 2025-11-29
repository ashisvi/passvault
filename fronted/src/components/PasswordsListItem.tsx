import useThemeColor from "@/hooks/useThemeColor";
import { Password } from "@/types/password";
import copyToClipboard from "@/utils/copyToClipboard";
import { decryptPassword } from "@/utils/encryption";
import { Copy } from "iconsax-react-native";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

const PasswordsListItem = ({ password }: { password: Password }) => {
  const themeColors = useThemeColor();

  return (
    <View style={styles.card}>
      <Image
        src={`https://${password.websiteUrl}/favicon.ico`}
        style={styles.image}
        crossOrigin="anonymous"
      />
      <View style={styles.body}>
        <Text style={styles.website}>{password.websiteName}</Text>
        <Text style={[styles.username, { color: themeColors.tabIconDefault }]}>
          {password.username}
        </Text>
      </View>
      <Pressable>
        <Copy
          size={24}
          color={themeColors.tabIconDefault}
          onPress={() => copyToClipboard(decryptPassword(password.password))}
        />
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
    height: 40,
    width: 40,
  },
  body: {
    flex: 1,
    marginLeft: 10,
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
