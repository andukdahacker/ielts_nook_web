import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteAssignment from "../network/delete_assignment";

function useDeleteAssignment() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignment"] });
      notifications.show({ message: "Deleted assignment successfully" });
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to delete assignment due to: " + error.message,
      });
    },
  });

  return mutation;
}

export default useDeleteAssignment;
