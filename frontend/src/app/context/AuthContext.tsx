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

console.log("API_URL", API_URL);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    setLoading(true);
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored: ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true,
        });
      }

      setLoading(false);
    };

    loadToken();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      return await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
    } catch (e) {
      console.log(e)
      return { error: true, msg: (e as any).response.data.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      console.log("~ file AuthContext.tsx ~ login ~ result", result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      router.replace("/home");
      return result;
    } catch (e) {
      console.log((e as AxiosError).message)
      return { error: true, msg: (e as any).response.data.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: null,
    });

    router.replace("/login");
    setLoading(false);
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    isLoading: loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
