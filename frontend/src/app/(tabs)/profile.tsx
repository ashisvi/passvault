import { router } from "expo-router";
import { Button, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { onLogout } = useAuth();

  return (
    <View>
      <Button title="Log Out" onPress={onLogout} />
      <Button title="Go back" onPress={() => router.navigate("/")} />
      <Button
        title="Add Password"
        onPress={() => router.replace("add-password")}
      />
    </View>
  );
};

export default Profile;
