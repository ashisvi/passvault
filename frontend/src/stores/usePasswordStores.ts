import { Password } from "@/types/passwords";
import { create } from "zustand";

interface PasswordStore {
  passwords: Password[];
  addPassword: (password: Password) => void;
  removePassword: (id: string) => void;
  updatePassword: (id: string, updatedPassword: Partial<Password>) => void;
}

export const usePasswordStore = create<PasswordStore>((set, get) => {
  return {
    // Sample passwords for testing
    passwords: [
      {
        id: "1",
        username: "user@example.com",
        password: "SecurePass123!",
        siteName: "Gmail",
        url: "https://gmail.google.com",
        notes: "Personal email account",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        username: "john_doe",
        password: "MyGitHubPass456#",
        siteName: "GitHub",
        url: "https://github.com",
        notes: "Work account",
        createdAt: new Date().toISOString(),
      },
    ],

    addPassword: (password: Password) => {
      set((state) => ({ passwords: [...state.passwords, password] }));
    },

    removePassword: (id: string) => {
      set((state) => ({
        passwords: state.passwords.filter((p) => p.id !== id),
      }));
    },

    updatePassword: (id: string, updatedPassword: Partial<Password>) => {
      set((state) => ({
        passwords: state.passwords.map((p) =>
          p.id === id ? { ...p, ...updatedPassword } : p
        ),
      }));
    },
  };
});
export default usePasswordStore;
