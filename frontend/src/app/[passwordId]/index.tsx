import { Button, Text, View } from "@/components";
import { usePasswords } from "@/hooks/usePasswords";
import useThemeColor from "@/hooks/useThemeColor";
import { decryptPassword } from "@/utils/encryption";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowDown2 } from "iconsax-react-native";
import { useState } from "react";
import { Image, StyleSheet, Switch } from "react-native";

const PasswordPage = () => {
  const themeColors = useThemeColor();
  const { passwordId } = useLocalSearchParams();
  const { passwords } = usePasswords();

  const password = passwords.find((password) => password._id === passwordId);

  if (!password) {
    return null;
  }

  const decryptedPassword = decryptPassword(password?.password);

  // Dummy code for switch button start
  const [isOn, setIsOn] = useState(false);
  // Dummy code for switch button end

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Website Icon */}
        <Image
          src={`https://${password.websiteUrl}/favicon.ico`}
          style={styles.image}
          crossOrigin="anonymous"
        />
        {/* Website Name and username */}
        <View style={styles.headerTexts}>
          <Text style={styles.website}>{password.websiteName}</Text>
          <Text
            style={[styles.username, { color: themeColors.tabIconDefault }]}
          >
            {password.username}
          </Text>
        </View>
      </View>
      {/* Details */}
      <View style={styles.details}>
        <View
          style={[
            styles.headingWrapper,
            { borderColor: themeColors.borderColor },
          ]}
        >
          <Text style={styles.heading}>Details & Settings</Text>
          <ArrowDown2 color={themeColors.text} />
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.tableText}>Link</Text>
            </View>
            <View style={styles.value}>
              <Link
                href={`http://${password.websiteUrl}`}
                style={[
                  styles.tableText,
                  { color: themeColors.tint, textDecorationLine: "underline" },
                ]}
              >
                {password.websiteUrl}
              </Link>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.tableText}>User id</Text>
            </View>
            <View style={styles.value}>
              <Text
                style={[styles.tableText, { color: themeColors.borderColor }]}
              >
                {password.username}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.tableText}>Password</Text>
            </View>
            <View style={styles.value}>
              <Text
                style={[styles.tableText, { color: themeColors.borderColor }]}
              >
                {decryptedPassword}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.tableText}>Autofill</Text>
            </View>
            <View style={styles.value}>
              <Switch
                thumbColor={themeColors.tint}
                trackColor={{
                  true: themeColors.tint,
                  false: themeColors.borderColor,
                }}
                value={isOn}
                onValueChange={setIsOn}
                style={{
                  width: 50,
                  transform: [{ scale: 1.25 }],
                }}
              />
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View style={styles.buttons}>
          <Button
            title="Copy password"
            onPress={() => {}}
            variant="secondary"
            style={[
              styles.button,
              {
                borderColor: themeColors.borderColor,
              },
            ]}
            buttonTextStyle={styles.buttonTextStyle}
          />
          <Button
            title="Change password"
            onPress={() => {
              router.push({
                pathname: `/${password._id}/modal`,
                params: { ...password },
              });
            }}
            variant="secondary"
            style={[
              styles.button,
              {
                borderColor: themeColors.borderColor,
              },
            ]}
            buttonTextStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default PasswordPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  image: {
    height: 75,
    width: 75,
  },
  headerTexts: {
    marginLeft: 10,
  },
  website: {
    fontWeight: "semibold",
    fontSize: 22,
  },
  username: {
    fontSize: 16,
  },
  // Details
  details: {
    marginTop: 20,
  },
  headingWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  // Table
  table: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 2,
  },
  tableText: {
    fontSize: 19,
    fontWeight: "semibold",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 20,
  },
  button: {
    borderWidth: 1,
  },
  buttonTextStyle: {
    fontSize: 14,
    marginVertical: 5,
    fontWeight: "semibold",
  },
});
