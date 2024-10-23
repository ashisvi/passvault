import { Button, CustomInput } from "@/components";
import usePasswords from "@/hooks/usePasswords";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function AddPassword() {
  const { addPassword, error, loading } = usePasswords();
  const [disabled, setDisabled] = useState(true);
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (websiteName && websiteUrl && username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [websiteName, websiteUrl, username, password]);

  const handleSubmit = async () => {
    if (websiteName && websiteUrl && username && password) {
      const result = await addPassword({
        websiteName,
        websiteUrl,
        username,
        password,
      });

      if (result?.status === 201) {
        return router.replace(`passwords/${result?.data._id}/password-page`);
      }
    }
  };

  return (
    <View className="flex-1 justify-evenly items-center bg-white">
      {error && !loading && (
        <Text className="text-red-600 p-3 border-red-600">{error}</Text>
      )}
      <View className="flex-1 w-full px-3 py-5 bg-white">
        <View className="mt-5">
          <CustomInput
            placeholder="Website Ex. Amazon"
            value={websiteName}
            setValue={setWebsiteName}
          />
        </View>
        <View className="mt-5">
          <CustomInput
            placeholder="URL Ex. www.amazon.com"
            value={websiteUrl}
            setValue={setWebsiteUrl}
          />
        </View>
        <View className="mt-5">
          <CustomInput
            placeholder="Username or Email"
            value={username}
            setValue={setUsername}
          />
        </View>
        <View className="mt-5">
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            password
          />
        </View>
        <View className="flex justify-center items-center mt-5">
          <Button handleOnPress={handleSubmit} isDisabled={disabled} />
        </View>
      </View>
    </View>
  );
}
