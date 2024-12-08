import { axiosInstance } from "@/utils/axiosConfig";
import { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    _id?: string;
    name?: string;
    email?: string;
  } | null;
  setAuthenticated: (state: boolean) => void;
  fetchUser: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set: any) => ({
  token: SecureStore.getItem("token"),
  isAuthenticated: false,
  user: null,
  setAuthenticated: (state: boolean) => set({ isAuthenticated: state }),

  // Function to handle register action
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        const { token } = response.data;
        await SecureStore.setItemAsync("token", `Bearer ${token}`); // Store token in secure store
        set({ isAuthenticated: true, user: response.data.user });
      } else {
        throw new Error("Unable to register user");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error registering user:", error.response?.data?.message);
        throw new Error(error.response?.data?.message);
      }
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
      if (error instanceof AxiosError) {
        console.log("Error logging in user:", error.response?.data?.message);
        throw new Error(error.response?.data?.message);
      }
      throw error;
    }
  },

  // fetchUser action
  fetchUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ isAuthenticated: true, user: response.data?.user });
    } catch (error) {
      throw error;
    }
  },

  // Function to handle logout action
  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ isAuthenticated: false, user: null, token: null });
  },
}));
