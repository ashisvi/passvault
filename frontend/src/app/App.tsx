import CreateVault from "@/components/CreateVault";
import UnlockScreen from "@/components/UnlockScreen";
import "@/global.css";
import * as CryptoES from "crypto-es";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, View } from "react-native";

export default function App() {
  const [masterPassword, setMasterPassword] = useState("");
  const [storedMasterPassword, setStoredMasterPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIfFirstTime();
  }, []);

  const checkIfFirstTime = async () => {
    // (async () => await SecureStore.deleteItemAsync("masterPassword"))();
    const hasSetPassword = await SecureStore.getItemAsync("masterPassword");
    console.log("Stored Master Password:", hasSetPassword);

    if (hasSetPassword) {
      setStoredMasterPassword(hasSetPassword);
    }
  };

  const createVault = async () => {
    if (masterPassword.length < 8) {
      Alert.alert(
        "Weak password",
        "Password must be at least 8 characters long."
      );
      return;
    }

    setIsLoading(true);

    try {
      const salt = CryptoES.WordArray.random(128 / 8).toString();
      const key = CryptoES.PBKDF2(masterPassword, salt, {
        keySize: 256 / 32,
        iterations: 1000,
      }).toString();

      await SecureStore.setItemAsync("masterPassword", key);
      await SecureStore.setItemAsync("salt", salt);

      Alert.alert(
        "Success",
        "Your secure vault has been created successfully!"
      );
      setMasterPassword("");
      setIsUnlocked(true); // Auto-unlock after creation
    } catch (error) {
      Alert.alert("Error", "Failed to create vault. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const unlockVault = async (enteredPassword: string | undefined) => {
    if (!enteredPassword) {
      Alert.alert("Error", "Password cannot be empty.");
      return;
    }

    setIsLoading(true);

    try {
      const salt = await SecureStore.getItemAsync("salt");
      const storedKey = await SecureStore.getItemAsync("masterPassword");

      if (!salt || !storedKey) {
        Alert.alert("Error", "Vault not found. Please create a new vault.");
        setIsLoading(false);
        return;
      }

      const derivedKey = CryptoES.PBKDF2(enteredPassword, salt, {
        keySize: 256 / 32,
        iterations: 1000,
      }).toString();

      if (derivedKey === storedKey) {
        setIsUnlocked(true);
      } else {
        Alert.alert("Wrong Password", "Try again", [
          { text: "OK", onPress: () => checkIfFirstTime() },
        ]);
      }
    } catch (error) {
      Alert.alert("Unlock Failed", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-900">
      {isLoading && (
        <View className="absolute inset-0 bg-black/50 z-10 justify-center items-center">
          <ActivityIndicator size="large" color="#00ff9d" />
        </View>
      )}

      {!isUnlocked ? (
        <View className="flex-1 justify-center items-center px-6 py-10">
          <Image
            source={require("@/assets/logo.png")}
            className="w-32 h-32 mb-2"
            resizeMode="contain"
          />
          <Text className="text-4xl font-bold text-center text-sky-500 mb-5">
            PassVault
          </Text>

          {!storedMasterPassword ? (
            <CreateVault
              masterPassword={masterPassword}
              createVault={createVault}
              isLoading={isLoading}
              setMasterPassword={setMasterPassword}
            />
          ) : (
            <UnlockScreen
              isLoading={isLoading}
              masterPassword={masterPassword}
              setMasterPassword={setMasterPassword}
              unlockVault={unlockVault}
            />
          )}

          <Text className="text-center mt-8 text-gray-400 text-sm px-6">
            Make sure to remember your master password. It cannot be recovered
            if forgotten!
          </Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-3xl font-bold text-green-500">
            Unlocked Successfully
          </Text>
          <Text className="text-center text-gray-300 mt-6 text-lg">
            Your encrypted vault is ready. Add your first password!
          </Text>
        </View>
      )}
    </View>
  );
}
