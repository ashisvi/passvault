import { create } from "zustand";

interface PasswordSchema {
  id: string;
  username: string;
  password: string;
  siteName?: string;
  url?: string;
  notes?: string;
  createdAt?: string;
}

interface PasswordStore {
  passwords: PasswordSchema[];
  addPassword: (password: PasswordSchema) => void;
  removePassword: (id: string) => void;
  updatePassword: (
    id: string,
    updatedPassword: Partial<PasswordSchema>
  ) => void;
}

export const usePasswordStore = create<PasswordStore>((set, get) => {
  return {
    passwords: [],

    addPassword: (password: PasswordSchema) => {
      set((state) => ({ passwords: [...state.passwords, password] }));
    },

    removePassword: (id: string) => {
      set((state) => ({
        passwords: state.passwords.filter((p) => p.id !== id),
      }));
    },

    updatePassword: (id: string, updatedPassword: Partial<PasswordSchema>) => {
      set((state) => ({
        passwords: state.passwords.map((p) =>
          p.id === id ? { ...p, ...updatedPassword } : p
        ),
      }));
    },
  };
});
export default usePasswordStore;
