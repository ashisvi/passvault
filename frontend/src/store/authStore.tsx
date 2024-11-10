import { axiosInstance } from "@/api/axiosConfig";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  setAuthenticated: (state: boolean) => void;
  setUser: (state: any) => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set: any) => ({
  isAuthenticated: false,
  user: null,
  setAuthenticated: (state: boolean) => set({ isAuthenticated: state }),
  setUser: (state: any) => set({ user: state }),

  // Function to handle register action
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        await SecureStore.setItemAsync("token", `Bearer ${token}`); // Store token in secure store
        set({ isAuthenticated: true, user: response.data.user });
      } else {
        throw new Error("Unable to register user");
      }
    } catch (error) {
      throw error;
    }
  },

  // Function to handle login action
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        await SecureStore.setItemAsync("token", `Bearer ${token}`);
        set({ isAuthenticated: true, user: response.data.user });
      } else {
        throw new Error("Unable to login user");
      }
    } catch (error) {
      throw error;
    }
  },

  // Function to handle logout action
  logout: () => set({ isAuthenticated: false, user: null }),
}));
