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
    // (async () => SecureStore.deleteItemAsync("masterPassword"))();
    checkIfFirstTime();
  }, []);

  const checkIfFirstTime = async () => {
    const hasSetPassword = await SecureStore.getItemAsync("masterPassword");

    // Debug logs
    console.log("Stored Mastered Passowrd:", hasSetPassword);

    if (hasSetPassword) {
      // Vault exists -> ask for password to unlock
      setStoredMasterPassword(hasSetPassword);
    }
  };

  const createVault = async () => {
    if (masterPassword.length < 8) {
      Alert.alert(
        "Weak password",
        "Password must be at least 8 characters long."
      );
    }

    setIsLoading(true);

    try {
      // Derive a strong 256-bit key using PBKDF2 (much better than plain SHA-256)
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

      // Re-derive the key from entered password + saved salt
      const derivedKey = CryptoES.PBKDF2(enteredPassword, salt, {
        keySize: 256 / 32,
        iterations: 1000,
      }).toString();

      if (derivedKey === storedKey) {
        // Success -> Unlock the app
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
    <View className="h-full">
      {/* If loading -> show indicator */}
      {isLoading && <ActivityIndicator size="large" color="#00ff9d" />}

      {/* If Unlocked -> show main app */}
      {!isUnlocked ? (
        <View className="p-5 flex-1 justify-center items-center py-20">
          <Image source={require("@/assets/logo.png")} />
          <Text className="text-3xl font-bold text-center text-sky-500 mb-5">
            PassVault
          </Text>
          {!storedMasterPassword ? (
            <>
              {/* If master password is not created -> Create vault screen */}
              <CreateVault
                masterPassword={masterPassword}
                createVault={createVault}
                isLoading={isLoading}
                setMasterPassword={setMasterPassword}
              />
            </>
          ) : (
            <>
              {/* If vault is created -> Enter password to unlock */}
              <UnlockScreen
                isLoading={isLoading}
                masterPassword={masterPassword}
                setMasterPassword={setMasterPassword}
                unlockVault={unlockVault}
              />
            </>
          )}
          <View>
            <Text className="text-center mt-4 text-gray-600">
              Make sure to remember your master password. It cannot be recovered
              if forgotten!
            </Text>
          </View>
        </View>
      ) : (
        <View className="p-5 flex justify-center items-center h-full">
          <Text className="text-2xl text-red-600">Unlocked Successfully</Text>
          <Text className="text-center">
            Your encrypted vault is ready. Next step: add your first password!
          </Text>
        </View>
      )}
    </View>
  );
}
