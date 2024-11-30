import { Button, Input, Text, View } from "@/components";
import { usePasswords } from "@/hooks/usePasswords";
import { decryptPassword, encryptPassword } from "@/utils/encryption";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const PasswordModal = () => {
  const params = useLocalSearchParams();
  const { updatePassword } = usePasswords();

  const decryptedPassword = decryptPassword(params.password as string);

  const [isDisabled, setIsDisabled] = useState(false);
  const [websiteName, setWebsiteName] = useState(params.websiteName as string);
  const [username, setUsername] = useState(params.username as string);
  const [websiteUrl, setWebsiteUrl] = useState(params.websiteUrl as string);
  const [password, setPassword] = useState(decryptedPassword);

  useEffect(() => {
    if (websiteName && username && websiteUrl && password) {
      if (
        websiteName === params.websiteName &&
        username === params.username &&
        websiteUrl === params.websiteUrl &&
        password === decryptedPassword
      ) {
        setIsDisabled(false);
      }
    }
  }, [websiteName, username, websiteUrl, password]);

  const handleUpdate = useCallback(async () => {
    if (isDisabled) return;

    const encryptedPassword = encryptPassword(password);

    const updatedPassword = {
      websiteName,
      username,
      websiteUrl,
      password: encryptedPassword,
    };

    try {
      await updatePassword({ id: params._id as string, data: updatedPassword });
      router.back();
    } catch (error) {
      console.log(error);
    }
  }, [websiteName, username, websiteUrl, password]);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Website Name</Text>
        <Input
          id="websiteName"
          placeholder="Website Name"
          value={websiteName}
          onChangeText={setWebsiteName}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Username</Text>
        <Input
          id="username"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Website URL</Text>
        <Input
          id="websiteUrl"
          placeholder="Website URL"
          value={websiteUrl}
          onChangeText={setWebsiteUrl}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <Input
          id="password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            router.back();
          }}
          variant="secondary"
          title="Discard"
          disabled={isDisabled}
        />
        <Button onPress={handleUpdate} title="Save" disabled={isDisabled} />
      </View>
    </View>
  );
};

export default PasswordModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  field: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    gap: 10,
  },
});
