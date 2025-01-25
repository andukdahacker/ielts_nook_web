import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteClass from "../network/delete_class";

function useDeleteClass() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centerClass"] });
      notifications.show({ message: "Deleted class successfully" });
    },
    onError: () => {
      notifications.show({ message: "Failed to delete class" });
    },
  });

  return mutation;
}

export default useDeleteClass;
