import { Button, Text, View } from "@/components";
import useThemeColor from "@/hooks/useThemeColor";
import { router, Stack, usePathname } from "expo-router";
import { SecurityUser } from "iconsax-react-native";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  const themeColors = useThemeColor();
  const currentPath = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <SecurityUser size={100} color={themeColors.tint} variant="Bulk" />
          <View style={styles.headerTexts}>
            <Text style={[styles.heading, { color: themeColors.tint }]}>
              PassVault
            </Text>
            <Text style={styles.subHeading}>Secure Your Passwords</Text>
          </View>
        </View>
        <View
          style={[
            styles.formContainer,
            { borderColor: themeColors.borderColor },
          ]}
        >
          <View
            style={[
              styles.formHeader,
              { borderColor: themeColors.borderColor },
            ]}
          >
            <Button
              title="Register"
              onPress={() => router.push("/register")}
              variant={currentPath === "/register" ? "primary" : "secondary"}
            />
            <Button
              title="Login"
              onPress={() => router.push("/login")}
              variant={currentPath === "/login" ? "primary" : "secondary"}
            />
          </View>
          <View style={styles.formContents}>
            <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
              <Stack.Screen name="register" />
              <Stack.Screen name="login" />
            </Stack>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    height: "80%",
    width: "90%",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 80,
  },
  headerTexts: {},
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "MontserratBold",
    marginVertical: 5,
  },
  subHeading: {
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
  },
  formContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    gap: 10,
    flex: 1,
  },
  formHeader: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  formContents: {
    flex: 1,
  },
});

export default AuthLayout;
