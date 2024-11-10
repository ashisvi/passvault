import { AxiosError } from "axios";
import { axiosInstance } from "./axiosConfig";

import {
  CreatePasswordDTO,
  Password,
  UpdatePasswordDTO,
} from "@/types/password";

// Custom error class
class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const passwordService = {
  // Function to handle fetch password action
  async fetchPasswords(): Promise<Password[]> {
    try {
      // Get request to fetch all data and return data
      const { data } = await axiosInstance.get<Password[]>(`/passwords`);
      return data;
    } catch (error) {
      // Handling error while fetching password
      if (error instanceof AxiosError) {
        throw new ApiError(
          error.response?.data?.message || `Failed to fetch passwords`
        );
      }
      throw error;
    }
  },

  // Function to handle add password action
  async addPassword(passwordData: CreatePasswordDTO): Promise<Password> {
    try {
      // Post request to add new password
      const { data } = await axiosInstance.post("/passwords", passwordData);
      return data;
    } catch (error) {
      // Handling error while adding password
      if (error instanceof AxiosError) {
        throw new ApiError(
          error.response?.data?.message || "Failed to add password"
        );
      }
      throw error;
    }
  },

  // Function to handle update password action
  async updatePassword(
    id: string,
    passwordData: UpdatePasswordDTO
  ): Promise<Password> {
    try {
      // Put request to update password
      const { data } = await axiosInstance.put<Password>(
        `/passwords/${id}`,
        passwordData
      );
      return data;
    } catch (error) {
      // Handling error while updating password
      if (error instanceof AxiosError) {
        throw new ApiError(
          error.response?.data?.message || "Failed to update password"
        );
      }
      throw error;
    }
  },

  // Function to handle delete password action
  async deletePassword(id: string): Promise<void> {
    try {
      // Delete request to delete a password
      await axiosInstance.delete(`/passwords/${id}`);
    } catch (error) {
      // handling error while deleting password
      if (error instanceof AxiosError) {
        throw new ApiError(
          error.response?.data?.message || "Failed to delete password"
        );
      }
      throw error;
    }
  },
};
