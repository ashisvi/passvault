import { API_URL, useAuth } from "@/app/context/AuthContext";
import { decryptPassword, encryptPassword } from "@/utils/encryption";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const usePasswords = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // initialize to false for better control
  const [error, setError] = useState<string | null>(null);

  const { authState } = useAuth();

  // Memoize headers to prevent unnecessary re-renders
  const headers = useMemo(() => {
    return authState?.token ? { Authorization: `Bearer ${authState.token}` } : {};
  }, [authState?.token]);

  // Refactored fetchPasswords with better loading state management
  const fetchPasswords = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_URL}/passwords`, { headers });

      const data = await response.data?.passwords || [];
      const encryptedPasswords = data.map((password: Password) => ({
        ...password,
        password: decryptPassword(password.password),
      }));

      setPasswords(encryptedPasswords);
    } catch (err) {
      console.error("Error fetching passwords:", err);
      setError("Failed to fetch passwords");
    } finally {
      setLoading(false);
    }
  };

  const addPassword = async (newPassword: Password) => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios.post(
        `${API_URL}/passwords`,
        {
          ...newPassword,
          password: encryptPassword(newPassword.password),
        },
        {
          headers,
        }
      );
      fetchPasswords(); // refresh passwords list after addition

      return result;
    } catch (err) {
      console.log("Failed to add password:", err);
      setError("Failed to add password");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (id: string, updatedPassword: Password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.put(
        `${API_URL}/passwords/${id}`,
        {
          ...updatedPassword,
          password: encryptPassword(updatedPassword.password),
        },
        headers
      );

      fetchPasswords(); // refresh passwords list after update
      return result
    } catch (err) {
      console.log("Failed to update password:", err);
      setError("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const deletePassword = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URL}/passwords/${id}`, { headers });
      fetchPasswords(); // refresh passwords list after deletion
    } catch (err) {
      console.error("Failed to delete password:", err);
      setError("Failed to delete password");
    } finally {
      setLoading(false);
    }
  };

  // Fetch passwords on component mount
  useEffect(() => {
    fetchPasswords();
  }, []);

  return {
    passwords,
    loading,
    error,
    fetchPasswords,
    addPassword,
    updatePassword,
    deletePassword,
  };
};

export default usePasswords;
