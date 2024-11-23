import Button from "@/components/Button";
import GeneratePassword from "@/components/GeneratePassword";
import Input, { type InputProps } from "@/components/Input";
import { Text, View } from "@/components/Themed";
import { usePasswords } from "@/hooks/usePasswords";
import useThemeColor from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

const NewPassword = () => {
  const themeColor = useThemeColor();
  const { addPassword } = usePasswords();

  const [websiteName, setWebsiteName] = useState("");
  const [username, setUsername] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [password, setPassword] = useState("");

  const handleGeneratePassword = useCallback(
    (
      length: number,
      numbers: boolean,
      lowercase: boolean,
      uppercase: boolean,
      symbols: boolean
    ) => {
      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numberChars = "0123456789";
      const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      // Create the character set based on the selected options
      let chars = "";
      if (lowercase) chars += lowercaseChars;
      if (uppercase) chars += uppercaseChars;
      if (numbers) chars += numberChars;
      if (symbols) chars += symbolChars;

      // Initialize the password
      let password = "";

      // Generate password
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
      }

      setPassword(password);
    },
    [setPassword]
  );

  const handleSubmit = useCallback(async () => {
    // Handle form submission
    const passwordData = {
      websiteName,
      username,
      websiteUrl,
      password,
    };

    try {
      await addPassword(passwordData);
      router.push("/(tabs)");
    } catch (error) {
      console.error(error);
    }
  }, [websiteName, username, websiteUrl, password]);

  return (
    <View style={styles.container}>
      {/* Form fields */}
      <TextField
        id="websiteName"
        label="Website"
        placeholder="website or app name"
        value={websiteName}
        onChangeText={setWebsiteName}
      />
      <TextField
        id="username"
        label="User id"
        placeholder="username or email id"
        value={username}
        onChangeText={setUsername}
      />
      <TextField
        id="websiteUrl"
        label="Website url"
        placeholder="website url"
        value={websiteUrl}
        onChangeText={setWebsiteUrl}
      />

      {/* Separator */}
      <View
        style={[
          styles.separator,
          {
            backgroundColor: themeColor.borderColor,
          },
        ]}
      ></View>

      {/* Password field */}
      <GeneratePassword
        password={password}
        setPassword={setPassword}
        handleGeneratePassword={handleGeneratePassword}
      />

      {/* Buttons */}
      <View style={styles.buttons}>
        <Button onPress={() => {}} title="Generate" variant="secondary" />
        <Button onPress={handleSubmit} title="Save" />
      </View>
    </View>
  );
};

interface TextFieldProps extends InputProps {
  label: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  placeholder,
  isPassword,
  onChangeText,
  style,
  value,
}) => {
  const themeColor = useThemeColor();

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        isPassword={isPassword}
        style={[
          styles.textInput,
          style,
          { borderBottomColor: themeColor.borderColor },
        ]}
      />
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  fieldGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    width: "100%",
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  textInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 5,
    width: "65%",
    fontSize: 18,
  },
  separator: {
    height: 1,
    width: "100%",
    marginVertical: 15,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 20,
  },
});
