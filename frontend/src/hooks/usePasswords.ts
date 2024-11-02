import { API_URL, useAuth } from "@/app/context/AuthContext";
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
      setPasswords(response.data?.passwords || []);
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
      await axios.post(`${API_URL}/passwords`, newPassword, { headers });
      fetchPasswords(); // refresh passwords list after addition
    } catch (err) {
      console.error("Error adding password:", err);
      setError("Failed to add password");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (id: string, updatedPassword: Password) => {
    setLoading(true);
    setError(null);

    try {
      await axios.put(`${API_URL}/passwords/${id}`, updatedPassword, { headers });
      fetchPasswords(); // refresh passwords list after update
    } catch (err) {
      console.error("Error updating password:", err);
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
      console.error("Error deleting password:", err);
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
