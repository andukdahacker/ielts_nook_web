import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteUser from "../network/delete_user";

function useDeleteUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (value: string) => deleteUser(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({ message: "Deleted user successfully" });
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to delete user due to error: " + error,
      });
    },
  });

  return mutation;
}

export default useDeleteUser;
