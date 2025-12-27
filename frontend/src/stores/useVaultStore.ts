import { usePasswordStore } from "@/stores/usePasswordStores";
import * as CryptoES from "crypto-es";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { create } from "zustand";

interface VaultStore {
  storedMasterPassword: string;
  isUnlocked: boolean;
  isVaultCreated: boolean;
  isLoading: boolean;
  checkIfFirstTime: () => Promise<void>;
  createVault: (password: string) => Promise<void>;
  unlockVault: (enteredPassword: string | undefined) => Promise<void>;
  lockVault: () => Promise<void>;
  deleteVault: () => Promise<void>;
}

export const useVaultStore = create<VaultStore>((set, get) => {
  return {
    storedMasterPassword: "",
    isUnlocked: false,
    isLoading: false,
    isVaultCreated: false,

    checkIfFirstTime: async () => {
      // await SecureStore.deleteItemAsync("masterPassword");
      const hasSetPassword = await SecureStore.getItemAsync("masterPassword");

      if (hasSetPassword)
        set({ storedMasterPassword: hasSetPassword, isVaultCreated: true });
    },

    createVault: async (pw) => {
      if (pw.length < 8) {
        Alert.alert(
          "Weak password",
          "Password must be at least 8 characters long."
        );
        return;
      }

      set({ isLoading: true });

      try {
        const salt = CryptoES.WordArray.random(128 / 8).toString();
        const key = CryptoES.PBKDF2(pw, salt, {
          keySize: 256 / 32,
          iterations: 10000,
        }).toString();

        await SecureStore.setItemAsync("masterPassword", key);
        await SecureStore.setItemAsync("salt", salt);

        Alert.alert(
          "Success",
          "Your secure vault has been created successfully!"
        );
        set({
          isUnlocked: true,
          storedMasterPassword: key,
          isVaultCreated: true,
        });

        // expose derived key to password store so it can encrypt/decrypt entries
        usePasswordStore.getState().setEncryptionKey(key);

        // router.replace("/");
      } catch (error) {
        Alert.alert("Error", "Failed to create vault. Please try again.");
      } finally {
        set({ isLoading: false });
      }
    },

    unlockVault: async (pw: string) => {
      if (!pw) {
        Alert.alert("Error", "Password cannot be empty.");
        return;
      }

      set({ isLoading: true });

      try {
        const salt = await SecureStore.getItemAsync("salt");
        const storedKey = await SecureStore.getItemAsync("masterPassword");

        if (!salt || !storedKey) {
          Alert.alert("Error", "Vault not found. Please create a new vault.");
          return;
        }

        const derivedKey = CryptoES.PBKDF2(pw, salt, {
          keySize: 256 / 32,
          iterations: 10000,
        }).toString();

        if (derivedKey === storedKey) {
          set({ isUnlocked: true });
          // set encryption key for password store
          usePasswordStore.getState().setEncryptionKey(derivedKey);
        } else {
          Alert.alert("Wrong Password", "Try again", [
            { text: "OK", onPress: () => get().checkIfFirstTime() },
          ]);
        }
      } catch (error) {
        Alert.alert("Unlock Failed", "Something went wrong");
      } finally {
        set({ isLoading: false });
      }
    },

    lockVault: async () => {
      set({ isUnlocked: false });
      // clear encryption key when vault is locked
      usePasswordStore.getState().setEncryptionKey(null);
      Alert.alert("", "Vault is locked");
    },

    deleteVault: async () => {
      try {
        Alert.alert(
          "Delete Vault",
          "This will delete the vault and ALL stored passwords. This action cannot be undone.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                await SecureStore.deleteItemAsync("masterPassword");
                await SecureStore.deleteItemAsync("salt");

                // clear password storage
                usePasswordStore.getState().deleteAllPasswords();

                // clear vault state
                set({
                  isUnlocked: false,
                  isVaultCreated: false,
                  storedMasterPassword: "",
                });
                usePasswordStore.getState().setEncryptionKey(null);

                Alert.alert("Success", "Vault deleted.");
              },
            },
          ]
        );
      } catch (error) {
        Alert.alert("Error", "Failed to delete vault.");
      }
    },
  };
});
