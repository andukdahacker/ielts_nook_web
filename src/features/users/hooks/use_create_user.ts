import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createUser from "../network/create_user";

function useCreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({ message: `Created new user successfully` });
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to create new user due to error: " + error.message,
        color: "red",
      });
    },
  });

  return mutation;
}

export default useCreateUser;
