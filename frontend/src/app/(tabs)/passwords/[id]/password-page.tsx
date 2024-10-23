import usePasswords from "@/hooks/usePasswords";
import { toCapitalCase, validatePassword } from "@/utils";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const PasswordPage = () => {
  const { id } = useLocalSearchParams();
  const { passwords } = usePasswords();
  const [showPassword, setShowPassword] = useState(false);

  const password = useMemo(
    () => passwords.find((password) => password._id === id),
    [passwords, id]
  );

  const passwordStrength = useMemo(() => {
    if (password && password?.password)
      return validatePassword(password?.password);
  }, [password]);

  return (
    <View className="bg-white flex-1 p-3">
      <View className="flex-row justify-between items-center ml-1 px-5">
        <View className="flex-row items-center gap-3">
          {password?.websiteUrl && (
            <Image
              src={`https://${password?.websiteUrl}/favicon.ico`}
              className="h-16 w-16"
              resizeMode="cover"
            />
          )}
          <Text className="text-xl font-montserrat-extrabold">
            {toCapitalCase(password?.websiteName)}
          </Text>
        </View>
        <Link href={`/passwords/${id}/edit-password`} asChild>
          <Pressable>
            <FontAwesome5 name="pencil-alt" size={24} color="#9046CF" />
          </Pressable>
        </Link>
      </View>
      <View className="mt-5">
        <View className="border border-grey/50 p-3 rounded-t-lg">
          <Text className="text-primary mb-1">Username</Text>
          <Text className="text-[16px]">{password?.username}</Text>
        </View>
        <View className="border border-grey/50 p-3">
          <View className="flex flex-row items-center">
            <View className="flex-1">
              <Text className="text-primary mb-1">Password</Text>
              <View className="flex flex-row items-center">
                <Text className="text-[16px] mr-3 font-montserrat-semibold">
                  {showPassword
                    ? password?.password
                    : "*".repeat(password?.password?.length || 0)}
                </Text>
                {/* TODO: make this button working. */}
                <Pressable>
                  <Ionicons name="copy" size={20} color="#9046CF75" />
                </Pressable>
              </View>
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
          <Link
            href={`http://${password?.websiteUrl}`}
            className="text-[16px] text-secondary"
          >
            https://{password?.websiteUrl}
            <MaterialCommunityIcons name="open-in-new" size={16} />
          </Link>
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
        <View className="flex-row justify-start items-center my-3">
          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color="#9046CF"
          />
          {password?.updatedAt && (
            <Text>
              Last edited on : {new Date(password.updatedAt).toLocaleString()}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default PasswordPage;
