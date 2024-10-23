import { API_URL, useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const usePasswords = () => {
  let headers = {};
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { authState } = useAuth();

  useEffect(() => {
    if (authState?.token) {
      headers = {
        Authorization: `Bearer: ${authState?.token}`,
      };
    }
  }, [authState, authState?.token]);

  const fetchPasswords = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/passwords`, {
        headers,
      });

      const data = await response.data;
      setPasswords(data?.passwords);
    } catch (err) {
      console.log(err);
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
        },
        {
          headers,
        }
      );
      fetchPasswords();

      return result;
    } catch (err) {
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
        updatePassword,
        headers
      );

      fetchPasswords();
      return result;
    } catch (err) {
      setError("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const deletePassword = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await fetch(`${API_URL as string}/${id}`, {
        method: "DELETE",
      });
      fetchPasswords();
    } catch (err) {
      setError("Failed to delete password");
    } finally {
      setLoading(false);
    }
  };

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
