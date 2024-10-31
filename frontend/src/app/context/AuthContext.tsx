import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (name: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoading?: boolean | null;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext<AuthProps>({});

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  // Load token from SecureStore when app loads
  useEffect(() => {
    setLoading(true);
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({ token, authenticated: true });
        }
      } catch (error) {
        console.log("Error loading token:", error);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  // Register function to create a new account
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      console.log("Registration error:", err.message);
      return {
        error: true,
        msg: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Login function to authenticate user
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await axios.post(`${API_URL}/auth/login`, { email, password });
      setAuthState({ token: result.data.token, authenticated: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      router.replace("/home");
      return result;
    } catch (error) {
      const err = error as AxiosError;
      console.log("Login error:", err.message);
      return {
        error: true,
        msg: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function to clear session
  const logout = async () => {
    setLoading(true);
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      axios.defaults.headers.common["Authorization"] = "";
      setAuthState({ token: null, authenticated: null });
      router.replace("/login");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Context value to provide throughout the app
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    isLoading: loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
