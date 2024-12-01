import {
  CreatePasswordDTO,
  Password,
  UpdatePasswordDTO,
} from "@/types/password";
import { passwordService } from "@/utils/passwordService";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

// Define query client
export const queryClient = new QueryClient();

// Hook to fetch all passwords
export const usePasswords = () => {
  // Define query
  const {
    data: passwords = [],
    error,
    status,
  } = useQuery<Password[]>({
    queryKey: ["passwords"],
    queryFn: passwordService.fetchPasswords,
  });

  // Define mutation for adding password
  const addPasswordMutation = useMutation<Password, Error, CreatePasswordDTO>({
    mutationFn: passwordService.addPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
        refetchType: "all",
      });
    },
  });

  // Define mutation for deleting password
  const deletePasswordMutation = useMutation<void, Error, string>({
    mutationFn: passwordService.deletePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
        refetchType: "all",
      });
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
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
        refetchType: "all",
      });
    },
  });

  return {
    passwords,
    error,
    status,
    addPassword: addPasswordMutation.mutateAsync,
    deletePassword: deletePasswordMutation.mutateAsync,
    updatePassword: updatePasswordMutation.mutateAsync,
  };
};
