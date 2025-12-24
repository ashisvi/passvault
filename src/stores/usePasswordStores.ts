import { Password } from "@/types/passwords";
import * as CryptoES from "crypto-es";
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import { create } from "zustand";

interface PasswordStore {
  passwords: Password[];
  isLoading: boolean;
  encryptionKey: string | null;

  setEncryptionKey: (key: string | null) => void;
  initDatabase: () => Promise<void>;
  loadPasswords: () => Promise<void>;
  addPassword: (password: Password) => void;
  deletePassword: (id: string) => void;
  deleteAllPasswords: () => void;
  updatePassword: (id: string, updatedPassword: Partial<Password>) => void;
  decryptPassword: (encrypted: string) => string;
  importPasswords?: (passwords: Password[]) => void;
}

// Database instance
let db: SQLite.SQLiteDatabase | null = null;

export const usePasswordStore = create<PasswordStore>((set, get) => ({
  // Sample passwords for testing
  passwords: [],
  isLoading: false,
  encryptionKey: null,

  setEncryptionKey: (key) => set({ encryptionKey: key }),

  initDatabase: async () => {
    if (!db) {
      db = SQLite.openDatabaseSync("passvault.db");
      await db?.execSync(`
          PRAGMA journal_mode=WAL;
          CREATE TABLE IF NOT EXISTS passwords (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            site TEXT NOT NULL,
            username TEXT,
            password TEXT NOT NULL,
            url TEXT,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
          `);
    }
  },

  loadPasswords: async () => {
    set({ isLoading: true });

    try {
      if (!db) await get().initDatabase();

      const results = db!.getAllSync<Password>(
        "SELECT * FROM passwords ORDER BY site ASC"
      );
      set({ passwords: results });
    } catch (error) {
      Alert.alert("Error", "Failed to load passwords.");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAllPasswords: async () => {
    try {
      if (!db) await get().initDatabase();
      db!.runSync("DELETE FROM passwords");
      await get().loadPasswords();
      Alert.alert("Success", "All passwords deleted.");
    } catch (error) {
      Alert.alert("Error", "Failed to delete all passwords.");
    }
  },

  addPassword: async ({ site, username, password, url, notes }: Password) => {
    const { encryptionKey } = get();
    if (!encryptionKey) {
      Alert.alert("Error", "Vault is not unlocked");
      return;
    }

    try {
      const encryptedPassword = CryptoES.AES.encrypt(
        password,
        encryptionKey
      ).toString();

      db!.runSync(
        "INSERT INTO passwords (site, username, password, url, notes) VALUES (?, ?, ?, ?, ?)",
        site,
        username || null,
        encryptedPassword,
        url || null,
        notes || null
      );

      await get().loadPasswords();
      Alert.alert("Success", `${site} saved securely!`);
    } catch (error) {
      Alert.alert("Error", "Failed to save password.");
    }
  },

  deletePassword: async (id: string) => {
    try {
      Alert.alert("Delete Password", "This action cannot be undone.", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            db!.runSync("DELETE FROM passwords WHERE id = ?", id);
            get().loadPasswords();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to delete password.");
    }
  },

  updatePassword: async (id: string, updatedPassword: Partial<Password>) => {
    try {
      if (!db) await get().initDatabase();

      // Fetch existing record
      const rows = db!.getAllSync<Password>(
        "SELECT * FROM passwords WHERE id = ?",
        id
      );

      const existing = rows && rows.length ? rows[0] : null;
      if (!existing) {
        Alert.alert("Error", "Password not found.");
        return;
      }

      const merged: Password = {
        ...existing,
        ...updatedPassword,
      } as Password;

      const { site, username, password, url, notes } = merged;

      const { encryptionKey } = get();
      if (!encryptionKey) {
        Alert.alert("Error", "Vault is not unlocked");
        return;
      }

      const encryptedPassword = password
        ? CryptoES.AES.encrypt(password, encryptionKey).toString()
        : existing.password;

      db!.runSync(
        "UPDATE passwords SET site = ?, username = ?, password = ?, url = ?, notes = ? WHERE id = ?",
        site,
        username || null,
        encryptedPassword,
        url || null,
        notes || null,
        id
      );

      await get().loadPasswords();
      Alert.alert("Success", "Password updated successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to update password");
    }
  },

  decryptPassword: (encrypted) => {
    const { encryptionKey } = get();
    if (!encryptionKey) return "[Locked]";
    try {
      const bytes = CryptoES.AES.decrypt(encrypted, encryptionKey);
      return bytes.toString(CryptoES.Utf8) || "[Invalid]";
    } catch {
      return "[Error]";
    }
  },

  importPasswords: async (passwords: Password[]) => {
    const { encryptionKey } = get();

    if (!encryptionKey) {
      Alert.alert("Error", "Vault is not unlocked");
      return;
    }

    set({ isLoading: true });

    try {
      for (const pwd of passwords) {
        const encryptedPassword = CryptoES.AES.encrypt(
          pwd.password,
          encryptionKey
        ).toString();

        db!.runAsync(
          "INSERT INTO passwords (site, username, password, url, notes) VALUES (?, ?, ?, ?, ?)",
          pwd.site,
          pwd.username || null,
          encryptedPassword,
          pwd.url || null,
          pwd.notes || null
        );
      }
      Alert.alert("Success", "Passwords imported successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to import passwords.");
    } finally {
      await get().loadPasswords();
      set({ isLoading: false });
    }
  },
}));
export default usePasswordStore;
