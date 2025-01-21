import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditUserFormInput } from "../edit_user.modal";
import updateUser from "../network/update_user";

function useUpdateUser(userId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: EditUserFormInput) => updateUser(values, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({ message: "Updated user successfully" });
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to update user due to error: " + error.message,
      });
    },
  });

  return mutation;
}

export default useUpdateUser;
