import { PasswordsList } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View } from "react-native";

const Passwords = () => {
  return (
    <View className="flex-1 bg-white/80">
      <PasswordsList />
      <Link href="passwords/add-password" className="absolute bottom-8 right-6">
        <Ionicons name="add-circle" color="#9046CF" size={62} />
      </Link>
    </View>
  );
};

export default Passwords;
