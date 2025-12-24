import { Copy } from "iconsax-react-nativejs";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import type { Password } from "@/types/passwords";

const PasswordCard = ({
  password,
  onPress,
}: {
  password: Password;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      className="w-full p-4 flex-row items-center justify-between shadow-sm bg-gray-700/20 rounded-lg"
      onPress={onPress}
    >
      <View className="flex-1 flex-row items-center justify-start gap-4">
        <Image
          src={`https://${password.url}/favicon.ico`}
          className="h-10 w-10"
        />
        <View>
          <Text className="text-white text-lg font-semibold">
            {password.site}
          </Text>
          <Text className="text-gray-400 text-[1rem]">{password.username}</Text>
        </View>
      </View>
      {/* TODO: Add copy functionality */}
      <Copy size={24} color="#9ca3af" />
    </Pressable>
  );
};

export default PasswordCard;
