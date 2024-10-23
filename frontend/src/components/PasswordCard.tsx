import { icons } from "@/constants";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  password: Password;
};

const PasswordCard = ({ password }: Props) => {
  return (
    <View className="w-full bg-white py-2 px-4 rounded-lg flex flex-row justify-between items-center mt-3 border border-primary">
      <Link
        href={`/passwords/${password._id}/password-page`}
        className="max-w-[80%]"
      >
        <View className="flex flex-row items-center">
          <View>
            {password.websiteUrl && (
              <Image
                src={`https://${password?.websiteUrl}/favicon.ico`}
                className="h-8 w-8"
                resizeMode="cover"
              />
            )}
          </View>
          <View className="ml-2">
            <Text className="text-lg font-semibold text-primary">
              {password?.websiteName}
            </Text>
            <Text className="text-[16px]">{password?.username}</Text>
          </View>
        </View>
      </Link>
      <TouchableOpacity>
        <Image
          source={icons.dots}
          tintColor="#9046CF"
          resizeMode="contain"
          className="h-6 w-6"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordCard;
