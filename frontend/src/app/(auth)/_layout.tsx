import Button from "@/components/Button";
import { Text, View } from "@/components/Themed";
import useThemeColor from "@/hooks/useThemeColor";
import { router, Stack, usePathname } from "expo-router";
import { Image, StyleSheet } from "react-native";

const AuthLayout = () => {
  const themeColor = useThemeColor();
  const currentPath = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            source={require("@assets/images/logo.png")}
            style={styles.image}
          />
          <View style={styles.headerTexts}>
            {/* <Text style={styles.heading}>PassVault</Text> */}
            <Text style={styles.subHeading}>Secure Your Passwords</Text>
          </View>
        </View>
        <View style={[styles.formContainer, { borderColor: themeColor.text }]}>
          <View style={[styles.formHeader, { borderColor: themeColor.text }]}>
            <Button
              title="Register"
              onPress={() => router.push("/register")}
              buttonType={currentPath === "/register" ? "primary" : "secondary"}
            />
            <Button
              title="Login"
              onPress={() => router.push("/login")}
              buttonType={currentPath === "/login" ? "primary" : "secondary"}
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
    height: 100,
    width: 100,
  },
  headerTexts: {},
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "SpaceMono",
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
