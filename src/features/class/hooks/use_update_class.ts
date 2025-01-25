import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateClass from "../network/update_class";

function useUpdateClass() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centerClass"] });
      notifications.show({ message: "Updated class successfully" });
    },
    onError: () => {
      notifications.show({ message: "Failed to update class" });
    },
  });

  return mutation;
}

export default useUpdateClass;
