import { passwordService } from "@/api/passwordService";
import {
  CreatePasswordDTO,
  Password,
  UpdatePasswordDTO,
} from "@/types/password";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

// Define query client
const queryClient = new QueryClient();

// Hook to fetch all passwords
export const usePasswords = () => {
  // Define query
  const {
    data: passwords = [],
    isLoading,
    error,
  } = useQuery<Password[]>({
    queryKey: ["passwords"],
    queryFn: passwordService.fetchPasswords,
    staleTime: 60 * 1000, // 1 minutes
  });

  // Define mutation for adding password
  const addPasswordMutation = useMutation<Password, Error, CreatePasswordDTO>({
    mutationFn: passwordService.addPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
  });

  // Define mutation for deleting password
  const deletePasswordMutation = useMutation<void, Error, string>({
    mutationFn: passwordService.deletePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
  });

  // Define mutation for updating password
  const updatePasswordMutation = useMutation<
    Password,
    Error,
    {
      id: string;
      data: UpdatePasswordDTO;
    }
  >({
    mutationFn: ({ id, data }) => passwordService.updatePassword(id, data), // Function to update password
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
  });

  return {
    passwords,
    isLoading,
    error,
    addPassword: addPasswordMutation.mutate,
    deletePassword: deletePasswordMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
  };
};
