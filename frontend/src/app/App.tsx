import "@/global.css";
import * as CryptoES from "crypto-es";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [masterPassword, setMasterPassword] = useState("");
  const [storedMasterPassword, setStoredMasterPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkIfFirstTime();
  }, []);

  const checkIfFirstTime = async () => {
    const hasSetPassword = await SecureStore.getItemAsync("masterPassword");

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
    <SafeAreaView className="">
      {/* If loading -> show indicator */}
      {isLoading && <ActivityIndicator size="large" color="#00ff9d" />}

      {/* If Unlocked -> show main app */}
      {!isUnlocked ? (
        <View className="p-5">
          {!storedMasterPassword ? (
            <>
              {/* If master password is not created -> Create vault screen */}
              <Text className="text-3xl font-bold text-center">PassVault</Text>
              <Text className="">
                {masterPassword
                  ? "Create your master password"
                  : "Re-enter to confirm"}
              </Text>

              <TextInput
                className="border border-amber-900 p-2 my-4 rounded"
                secureTextEntry
                placeholder="Master password (min 8 chars)"
                value={masterPassword}
                onChangeText={setMasterPassword}
                autoFocus
              />

              <TouchableOpacity
                className=""
                onPress={createVault}
                disabled={masterPassword.length < 8 || isLoading}
              >
                <Text className="">
                  {masterPassword === "" ? "Create Vault" : "Confirm & Create"}
                </Text>
              </TouchableOpacity>

              <Text className="">
                This password can NEVER be recovered if forgotten!
              </Text>
            </>
          ) : (
            <>
              {/* If vault is created -> Enter password to unlock */}

              <Text className="">Enter master password to unlock</Text>

              <TextInput
                className="border border-amber-900 p-2 my-4 rounded"
                secureTextEntry
                placeholder="Master password"
                value={masterPassword}
                onChangeText={setMasterPassword}
                autoFocus
              />

              <TouchableOpacity
                className="bg-blue-400 px-5 py-2 rounded-xl flex justify-center items-center"
                onPress={unlockVault.bind(null, masterPassword)}
                disabled={masterPassword.length < 8 || isLoading}
              >
                <Text className="text-xl text-white font-bold">Unlock</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        <View className="p-5 flex justify-center items-center h-full">
          <Text className="text-2xl text-red-600">Unlocked Successfully</Text>
          <Text className="text-center">
            Your encrypted vault is ready. Next step: add your first password!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
