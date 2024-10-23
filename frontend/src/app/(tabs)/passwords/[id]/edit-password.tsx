import { Button } from "@/components";
import usePasswords from "@/hooks/usePasswords";
import { validatePassword } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const EditPassword = () => {
  const { id } = useLocalSearchParams();
  const { passwords, updatePassword, error, loading } = usePasswords();
  const [showPassword, setShowPassword] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [websiteName, setWebsiteName] = useState<string | undefined>("");
  const [websiteUrl, setWebsiteUrl] = useState<string | undefined>("");
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  const passwordExist = useMemo(() => {
    return passwords.find((password) => password._id === id);
  }, [passwords, id]);

  useEffect(() => {
    if (websiteName && websiteUrl && username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [websiteName, websiteUrl, username, password]);

  useEffect(() => {
    if (passwordExist) {
      setWebsiteName(passwordExist.websiteName);
      setWebsiteUrl(passwordExist.websiteUrl);
      setUsername(passwordExist?.username);
      setPassword(passwordExist?.password);
    }
  }, [passwordExist]);

  const passwordStrength = useMemo(() => {
    if (passwordExist && passwordExist?.password)
      return validatePassword(passwordExist?.password);
  }, [password]);

  const handleSubmit = () => {
    if (websiteName && websiteUrl && username && password) {
      const result = updatePassword(id as string, {
        websiteName,
        websiteUrl,
        username,
        password,
      });

      console.log(result);
    }
  };

  return (
    <View className="bg-white flex-1 p-3">
      <View className="mt-5">
        <View className="border border-grey/50 p-3 rounded-t-lg">
          <Text className="text-primary mb-1">Website name</Text>
          <TextInput
            className="text-[16px] border border-grey/50 rounded-sm px-2"
            value={websiteName}
            onChangeText={setWebsiteName}
          />
        </View>
        <View className="border border-grey/50 p-3 rounded-t-lg">
          <Text className="text-primary mb-1">Username</Text>
          <TextInput
            className="text-[16px] border border-grey/50 rounded-sm px-2"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View className="border border-grey/50 p-3">
          <View className="flex flex-row items-center">
            <View className="flex-1">
              <Text className="text-primary mb-1">Password</Text>
              <TextInput
                className="text-[16px] border border-grey/50 rounded-sm px-2 mr-5"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View className="flex-row gap-3">
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={28}
                  color="#9046CF99"
                />
              </Pressable>
              {passwordStrength === "strong" ? (
                <Ionicons name="shield-checkmark" size={28} color="#00B200" />
              ) : passwordStrength === "medium" ? (
                <Ionicons name="shield-half" size={28} color="yellow" />
              ) : (
                <Ionicons name="shield-outline" size={28} color="red" />
              )}
            </View>
          </View>
        </View>
        <View className="border border-grey/50 p-3">
          <Text className="text-primary mb-1">Website</Text>
          <View className="flex-row">
            <Text className="text-[16px]">https://</Text>
            <TextInput
              className="text-[16px] border border-grey/50 rounded-sm px-2"
              value={websiteUrl}
              onChangeText={setWebsiteUrl}
            />
          </View>
        </View>
        <View className="border border-grey/50 p-3 rounded-b-lg">
          <Text className="text-primary mb-2">Tags</Text>
          <View className="flex-row justify-start items-center gap-2">
            <Text className="text-[15px] bg-grey/50 py-1 px-4 rounded-full">
              Wallet
            </Text>
            <Ionicons
              name="add-circle"
              size={30}
              color="#9046CF"
              onClick={() => {
                /* TODO: make this button working. */
              }}
            />
          </View>
        </View>
      </View>
      <View className="flex justify-center items-center mt-5">
        <Button handleOnPress={handleSubmit} isDisabled={disabled} />
      </View>
    </View>
  );
};

export default EditPassword;
